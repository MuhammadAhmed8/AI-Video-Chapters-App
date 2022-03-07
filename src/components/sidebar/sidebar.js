import styles from './sidebar.module.css';
import MovieIcon from '@mui/icons-material/Movie';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { height, style, width } from '@mui/system';

export default function Sidebar(props){
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                <div className={styles.mt20}>
                    <li className={styles.listItem}>
                        <div className={styles.listItemContent}> 
                        <MovieIcon></MovieIcon>
                        <span style={{marginLeft:10}}>Media</span>
                        </div>
                    
                    </li>
                    <li className={styles.listItem}>
                        <div className={styles.listItemContent}> 
                        <RssFeedIcon></RssFeedIcon>
                        <span style={{marginLeft:10}}>Feeds</span>
                        </div>
                    
                    </li>
                   
                </div>

                <hr className={styles.hr}/>

                <div className={styles.mt20}>
                    <li className={styles.listItem}>
                        <div className={styles.listItemContent}> 
                        <IntegrationInstructionsIcon></IntegrationInstructionsIcon>
                        <span style={{marginLeft:10}}>Integrations</span>
                        </div>
                    
                    </li>

                    <li className={styles.listItem}>
                        <div className={styles.listItemContent}> 
                        <FeedbackIcon></FeedbackIcon>
                        <span style={{marginLeft:10}}>Feedback</span>
                        </div>
                    
                    </li>
                </div>

                <hr className={styles.hr}/>

                <div className={styles.mt20}>
                    <li className={styles.listItem}>
                        <div className={styles.listItemContent}> 
                        <CreditCardIcon></CreditCardIcon>
                        <span style={{marginLeft:10}}>Billing</span>
                        </div>
                    
                    </li>

                </div>
            </ul>
            
            <div className={styles.wave}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f5" fill-opacity="1" d="M0,320L120,192L240,256L360,288L480,160L600,128L720,192L840,224L960,32L1080,192L1200,192L1320,96L1440,32L1440,320L1320,320L1200,320L1080,320L960,320L840,320L720,320L600,320L480,320L360,320L240,320L120,320L0,320Z"></path></svg>
            </div>
           
        </div>
    )
}