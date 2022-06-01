import React from 'react'
import './styles.css'

export const SpeedButton = ({onClick}) => {
    return (
        <button className="wide-btn" onClick={onClick}>
            1x
        </button>
    )
}
