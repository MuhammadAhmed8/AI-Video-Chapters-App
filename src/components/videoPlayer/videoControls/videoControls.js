import React from 'react'
import { VolumeSlider } from './volumeSlider/volumeSlider'
import { PlayPauseButton } from './playPauseButton/playPauseButton'
import { Timeline } from './timeline/timeline'
import { DurationContainer } from './durationContainer/durationContainer'
import { CaptionsButton } from './captionsButton/captionsButton'
import { SpeedButton } from './speedButton/speedButton'
import { MiniPlayerButton } from './miniPlayerButton/miniPlayerButton'
import { TheatreButton } from './theatreButton/theatreButton'
import { FullScreenButton } from './fullScreenButton/fullScreenButton'

import './styles.css'

export const VideoControls = ({
    onScrubbing,
    videoDuration,
    timelineProgressPosition,
    togglePlay,
    onVolumeChange,
    toggleMute,
    initialVolume,
    currentTime,
    totalTime,
    toggleCaptions,
    changePlaybackSpeed,
    toggleMiniPlayerMode,
    toggleTheaterMode,
    toggleFullScreenMode,
    playbackRate
}) => {
    return (
        <div className="video-controls-container">
            <Timeline handleScrubbing={onScrubbing} videoDuration={videoDuration} progressPosition={timelineProgressPosition}></Timeline>
            <div className="controls">
                <PlayPauseButton onClick={togglePlay} />
                <VolumeSlider onVolumeChange={onVolumeChange} onMuteClick={toggleMute} initialVolume={initialVolume} />
                <DurationContainer currentTime={currentTime} totalTime={totalTime} />
                {/* <CaptionsButton onClick={toggleCaptions} /> */}
                <SpeedButton onClick={changePlaybackSpeed} rate={playbackRate}/>
                <MiniPlayerButton onClick={toggleMiniPlayerMode} />
                <TheatreButton onClick={toggleTheaterMode} />
                <FullScreenButton onClick={toggleFullScreenMode} />
            </div>
        </div>
    )
}
