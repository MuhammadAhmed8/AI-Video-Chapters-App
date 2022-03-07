import { Button } from '@mui/material';
import React from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import Table from './components/table';
import styles from './media.module.css';
import UploadIcon from '@mui/icons-material/Upload';

export default function Media(props){
    return (
        <div className={styles.container}>
          <div className={styles.header}>
              <h2>My Videos</h2>
              <Button 
              color="primary"
              variant="contained"
              style={{boxShadow: "none", textTransform:"capitalize"}}
              size="medium"
              elevation={0}

              >
                <UploadIcon></UploadIcon>
                <span style={{marginLeft:10}}>Add Media</span>
                </Button>
          </div>
          <div>
              <Table></Table>
          </div>
        </div>
    )
}

