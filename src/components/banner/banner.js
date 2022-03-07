import React from "react";
import { TextField } from "@mui/material"; 
import styles from './banner.module.css';
import PersonIcon from '@mui/icons-material/Person';

export default function Banner({children,...props}){
    return (
        <div className={styles.banner}>
            <p>
                {children}
            </p>
        </div>
    )
}