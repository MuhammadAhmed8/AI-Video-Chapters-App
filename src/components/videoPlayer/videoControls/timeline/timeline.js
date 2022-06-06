import React, { useRef, useState } from 'react'
import styles from './styles.css'

export const Timeline = ({handleScrubbing,videoDuration,progressPosition}) => {

  const timelineContainer = useRef()
  // const previewImg = useRef()
  const [isScrubbing,setIsScrubbing] = useState(false)

  function handleTimelineUpdate(e) {
    const rect = timelineContainer.current.getBoundingClientRect()
    const percent = Math.min(Math.max(0, e.nativeEvent.x - rect.x), rect.width) / rect.width
    // const previewImgNumber = Math.max(
    //   1,
    //   Math.floor((percent * videoDuration) / 10)
    // )
    // const previewImgSrc = `previewImgs/preview${previewImgNumber}.jpg`
    // previewImg.current.src = previewImgSrc
    // timelineContainer.current.style.setProperty("--preview-position", percent)
  
    if (isScrubbing) {
      e.preventDefault()
      timelineContainer.current.style.setProperty("--progress-position", percent)
    }
  }

  function toggleScrubbing(e) {
    const rect = timelineContainer.current.getBoundingClientRect()
    const percent = Math.min(Math.max(0, e.nativeEvent.x - rect.x), rect.width) / rect.width
    console.log(percent)
    setIsScrubbing((prevIsScrubbing) => {
      let _isScrubbing = (e.nativeEvent.buttons & 1) === 1;
      handleTimelineUpdate(e)
      handleScrubbing({_isScrubbing,percent}) //yeehhh chahiye hoga for on click title
      return _isScrubbing;
    })
  }
  return (
    <div ref={timelineContainer} className="timeline-container" onMouseMove={handleTimelineUpdate} onMouseDown={toggleScrubbing} onMouseUp={(e) => setIsScrubbing((e.nativeEvent.buttons & 1) === 1)} style={{
      "--progress-position": progressPosition
    }}>
      <div className='timeline'>
        {/* <img ref={previewImg} className="preview-img" /> */}
        <div className="thumb-indicator"></div>
      </div>
    </div>
  )
}
