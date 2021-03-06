import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import Table from './components/table';
import styles from './media.module.css';
import UploadIcon from '@mui/icons-material/Upload';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { ProgressBar } from 'react-bootstrap'
import { IP ,chunkSize} from '../../components/constansts';



export default function Media(props) {

    const addMedia = useRef()

    const [loading,setLoading] = useState(true)
    const [showProgress, setShowProgress] = useState(false)
    const [counter, setCounter] = useState(1)
    const [fileToBeUpload, setFileToBeUpload] = useState({})
    const [beginingOfTheChunk, setBeginingOfTheChunk] = useState(0)
    const [endOfTheChunk, setEndOfTheChunk] = useState(chunkSize)
    const [progress, setProgress] = useState(0)
    const [fileGuid, setFileGuid] = useState("")
    const [fileSize, setFileSize] = useState(0)
    const [chunkCount, setChunkCount] = useState(0)
    const [fileName, setFileName] = useState("")
    const [videos,setVideos] = useState([])
    const [change,setChange] = useState('')

    const progressInstance = <ProgressBar animated now={progress} label={`${progress.toFixed(3)}%`} />;

    useEffect(() => {
        if (fileSize > 0) {
            fileUpload(counter);
        }
        console.log(progress)
    }, [fileToBeUpload, progress])

    const getFileContext = (e) => {
        resetChunkProperties();
        const _file = e.target.files[0];
        
        setFileName(_file.name)

        setFileSize(_file.size)
        const _totalCount = _file.size % chunkSize == 0 ? _file.size / chunkSize : Math.floor(_file.size / chunkSize) + 1; // Total count of chunks will have been upload to finish the file
        setChunkCount(_totalCount)

        setFileToBeUpload(_file)
        const _fileID = uuidv4() + "." + _file.name.split('.').pop();
        setFileGuid(_fileID)
        e.target.value = ''
        
    }


    const fileUpload = () => {
        setCounter(counter + 1);
        if (counter <= chunkCount) {
            var chunk = fileToBeUpload.slice(beginingOfTheChunk, endOfTheChunk);
            uploadChunk(chunk)
        }
    }

    const uploadChunk = async (chunk) => {
        try {
            var formData = new FormData();
            formData.append('video', chunk);
            console.log(counter)
            const response = await axios.post(IP+ "api/uploadChunks", formData, {
                params: {
                    id: counter,
                    fileGuid
                },
                headers: { 
                    'Content-Type': 'multipart/form-data'
                }
            });
            const data = response.data;
            
            if (data.isSuccess) {
                setBeginingOfTheChunk(endOfTheChunk);
                setEndOfTheChunk(endOfTheChunk + chunkSize);
                if (counter == chunkCount) {
                    console.log('Process is complete, counter', counter)

                    await uploadCompleted();
                } else {
                    var percentage = (counter / chunkCount) * 100;
                    setProgress(percentage);
                }
            } else {
                console.log('Error Occurred:', data.errorMessage)
            }

        } catch (error) {
            // debugger
            console.log('error', error)
        }
    }

    const uploadCompleted = async () => {
        var formData = new FormData();
        formData.append('fileName', fileGuid);
        const response = await axios.post(IP+ "api/uploadComplete", {}, {
            params: {
                fileName: fileName,
                fileGuid: fileGuid
            },
            data: formData,
        });

        const data = response.data;
        if (data.isSuccess) {
            setProgress(100);
        }
        setChange(fileGuid)
    }

    const resetChunkProperties = () => {
        setShowProgress(true)
        setProgress(0)
        setCounter(1)
        setBeginingOfTheChunk(0)
        setEndOfTheChunk(chunkSize)
    }

    const onMediaClick = () => {
        // `current` points to the mounted file input element
        addMedia.current.click();
        console.log("hello")
    };

    useEffect(()=>{

        const fetchVideoList = async () => {
            try{
                //change here 
                const response = await axios.get(IP+ "api/videosDetails");
                const data = response.data.result
                // sample data response format
                // let data = [{
                //     "id": "abehce11dveeez",
                //     "name": "video 1",
                //     "status":"processed",
                //     "uploaded":"An hour ago",
                //     "length": "30 min"
                // },{
                //     "id": "abehce11dveeez",
                //     "name": "video 1",
                //     "status":"processing",
                //     "uploaded":"An hour ago",
                //     "length": "30 min"
                // }]
                

                setVideos(data);
            }
            catch(err){
                console.error(err.message)
                setLoading(false)
            }
            finally{
                setLoading(false)
            }
        }


        const intervalId = setInterval(fetchVideoList,2000)

        return () => clearInterval(intervalId)
        
    },[])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>My Videos</h2>
                <Button
                    color="primary"
                    variant="contained"
                    style={{ boxShadow: "none", textTransform: "capitalize" }}
                    size="medium"
                    elevation={0}
                    onClick={onMediaClick}
                >
                    <UploadIcon></UploadIcon>
                    <span style={{ marginLeft: 10 }}>Add Media</span>
                    <input type='file' id='media' ref={addMedia} style={{ display: 'none' }} onChange={getFileContext} />
                </Button>
            </div>
            <div>
                {
                    loading && <div>Loading...</div>
                }
                {
                    !loading && (
                        <div>
                            <Table data={videos}></Table>
                        </div>
                    )
                }

                
            </div>
        </div>
    )
}

