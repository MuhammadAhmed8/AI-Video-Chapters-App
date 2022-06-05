import { useEffect, useRef, useState } from "react";
import './styles.css';
import { VideoControls } from "./videoControls/videoControls";

export default function VideoPlayer() {
    const speedBtn = document.querySelector(".speed-btn")

    const videoRef = useRef();
    const videoContainer = useRef();

    const [captions, setCaptions] = useState({})
    const [timelineProgressPosition, setTimelineProgressPosition] = useState(0)
    const [wasPaused, setWasPaused] = useState();
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState("0:00")
    const [totalTime, setTotalTime] = useState()
    const [thumbnailImg, setThumbnailImg] = useState(`previewImgs/preview1.jpg`)


    useEffect(() => {
        if (videoRef.current) {
            const _captions = videoRef.current.textTracks[0]
            _captions.mode = "hidden"
            setCaptions(_captions)
            videoRef.current.addEventListener("enterpictureinpicture", () => {
                videoContainer.current.classList.add("mini-player")
            })

            videoRef.current.addEventListener("leavepictureinpicture", () => {
                videoContainer.current.classList.remove("mini-player")
            })
        }
    }, [videoRef.current])

    useEffect(() => {
        document.addEventListener("keydown", e => {
            const tagName = document.activeElement.tagName.toLowerCase()
    
            if (tagName === "input") return
    
            switch (e.key.toLowerCase()) {
                case " ":
                    if (tagName === "button") return
                case "k":
                    togglePlay()
                    break
                case "f":
                    toggleFullScreenMode()
                    break
                case "t":
                    toggleTheaterMode()
                    break
                case "i":
                    toggleMiniPlayerMode()
                    break
                case "m":
                    toggleMute()
                    break
                case "arrowleft":
                case "j":
                    skip(-5)
                    break
                case "arrowright":
                case "l":
                    skip(5)
                    break
                case "c":
                    toggleCaptions()
                    break
            }
        })

        return () => document.removeEventListener('keydown')
    }, []);

    function handleScrubbing({ isScrubbing, percent }) {
        videoContainer.current.classList.toggle("scrubbing", isScrubbing)
        if (isScrubbing) {
            setWasPaused(videoRef.current.paused);
            videoRef.current.pause()
            const previewImgNumber = Math.max(
                1,
                Math.floor((percent * videoRef.current.duration) / 10)
            )
            setThumbnailImg(`previewImgs/preview${previewImgNumber}.jpg`);
        } else {
            videoRef.current.currentTime = percent * videoRef.current.duration
            if (!wasPaused) videoRef.current.play()
        }
    }


    // Playback Speed
    // speedBtn.addEventListener("click", changePlaybackSpeed)

    function changePlaybackSpeed() {
        let newPlaybackRate = videoRef.current.playbackRate + 0.25
        if (newPlaybackRate > 2) newPlaybackRate = 0.25
        videoRef.current.playbackRate = newPlaybackRate
        speedBtn.textContent = `${newPlaybackRate}x`
    }

    function toggleCaptions() {
        const isHidden = captions.mode === "hidden"
        captions.mode = isHidden ? "showing" : "hidden"
        videoContainer.current.classList.toggle("captions", isHidden)
    }

    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
        minimumIntegerDigits: 2,
    })
    function formatDuration(time) {
        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60) % 60
        const hours = Math.floor(time / 3600)
        if (hours === 0) {
            return `${minutes}:${leadingZeroFormatter.format(seconds)}`
        } else {
            return `${hours}:${leadingZeroFormatter.format(
                minutes
            )}:${leadingZeroFormatter.format(seconds)}`
        }
    }

    function skip(duration) {
        videoRef.currentTime += duration
    }

    function toggleMute() {
        videoRef.current.muted = !videoRef.current.muted
    }

    function toggleTheaterMode() {
        videoContainer.current.classList.toggle("theater")
    }

    function toggleFullScreenMode() {
        if (document.fullscreenElement == null) {
            videoContainer.current.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }

    function toggleMiniPlayerMode() {
        if (videoContainer.current?.classList.contains("mini-player")) {
            document.exitPictureInPicture()
        } else {
            videoRef.current.requestPictureInPicture()
        }
    }

    document.addEventListener("fullscreenchange", () => {
        videoContainer.current.classList.toggle("full-screen", document.fullscreenElement)
    })

    function togglePlay() {
        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause()
    }

    function onVolumeChange(volume) {
        videoRef.current.volume = volume
        videoRef.current.muted = volume === 0
    }

    return (
        <div ref={videoContainer} className="video-container paused" data-volume-level="high">
            <img src={thumbnailImg} className="thumbnail-img" />
            <VideoControls 
                onScrubbing={handleScrubbing}
                videoDuration={videoRef.current?.duration}
                timelineProgressPosition={timelineProgressPosition}
                togglePlay={togglePlay}
                initialVolume={volume}
                currentTime={currentTime}
                totalTime={totalTime}
                onVolumeChange={onVolumeChange}
                toggleCaptions={toggleCaptions}
                toggleFullScreenMode={toggleFullScreenMode}
                toggleMiniPlayerMode={toggleMiniPlayerMode}
                toggleMute={toggleMute}
                toggleTheaterMode={toggleTheaterMode}
            />
            <video 
            style={{width:"400px", borderRadius:"10px"}}
                ref={videoRef}
                onLoadedData={() => {
                    setTotalTime(formatDuration(videoRef.current.duration))
                }}
                onTimeUpdate={() => {
                    setCurrentTime(formatDuration(videoRef.current.currentTime))
                    const percent = videoRef.current.currentTime / videoRef.current.duration
                    setTimelineProgressPosition(percent)
                }}
                onVolumeChange={() => {
                    setVolume(videoRef.current.volume)
                    let volumeLevel
                    if (videoRef.current.muted || videoRef.current.volume === 0) {
                        setVolume(0)
                        volumeLevel = "muted"
                    } else if (videoRef.current.volume >= 0.5) {
                        volumeLevel = "high"
                    } else {
                        volumeLevel = "low"
                    }

                    videoContainer.current.dataset.volumeLevel = volumeLevel
                }}
                onClick={togglePlay}
                onPlay={() => {
                    videoContainer.current.classList.remove("paused")
                }}
                onPause={() => {
                    videoContainer.current.classList.add("paused")
                }}
                src="Video.mp4"
            >
                <track kind="captions" srcLang="en" src="subtitles.vtt" />
            </video>
        </div>
    )
}