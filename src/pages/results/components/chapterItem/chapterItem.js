import React from 'react';
import styles from "./chapterItem.module.css";

export default function ChapterItem(props){

    return (
    <div onClick={props.onClick}>
        <span className={styles.fancyNumber}>1</span>
        <span className={styles.timestamp}>{props.start} - {props.end}</span>
        <div>
          <p className={styles.title}>{props.title}</p>
        </div>
      </div>

    )
}