import React from 'react'
import './styles.css'

export const SpeedButton = ({onClick,rate}) => {
    return (
        <button className="wide-btn" onClick={onClick}>
            {rate}
        </button>
    )
}
