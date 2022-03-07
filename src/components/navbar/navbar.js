import React from "react";
import { TextField } from "@mui/material"; 
import styles from './navbar.module.css';
import PersonIcon from '@mui/icons-material/Person';

export default function Navbar(props){
    return (
        <nav className={styles.nav}>
            <div className={styles.navItem}>
                <h2 className={styles.title}>AI Chapters</h2>
            </div>

            <div className={styles.navItem} style={{flex:2}}>
            <TextField
            size="small"
            style={{width:"100%"}}
            label="Search input"
            InputProps={{
              type: 'search'
            }}
            />
            </div>

            <div className={styles.navItem}>
                <PersonIcon></PersonIcon>
            </div>
        </nav>
    )
}