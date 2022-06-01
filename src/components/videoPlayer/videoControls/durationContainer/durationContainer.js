import React from 'react'
import './styles.css'

export const DurationContainer = ({currentTime, totalTime}) => {
    return (
        <div className="duration-container">
            <div>{currentTime}</div>
            /
            <div>{totalTime}</div>
        </div>
    )
}
