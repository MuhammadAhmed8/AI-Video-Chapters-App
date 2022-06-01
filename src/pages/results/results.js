import React from 'react';
import VideoPlayer from '../../components/videoPlayer/videoPlayer';
import styles from './results.module.css';

export default function Results(props){
    return (
        <div>
            Results

            <div className={styles.container}>

                {/* chapters */}
                <div className={styles.chapters}>
                    <h3>Chapters</h3>
                    <div className={styles.chaptersList}>
                        <div>
                            <span className={styles.fancyNumber}>1</span>
                            <p>Introduction</p>
                        </div>
                        <div>
                            <span className={styles.fancyNumber}>2</span>
                            <p>Quantum Laws</p>
                        </div>
                        <div>
                            <span className={styles.fancyNumber}>3</span>
                            <p>Conclusion</p>
                        </div>
                    </div>
                </div>

                {/* transcript */}
                <div className={styles.transcript}>
                    <div className={styles.transcriptContent}>
                        <p>
                        Welcome back to a special Relativity. So we're starting a new chapter in which we look at tests and implications of special Relativity. We started this entire discussion and deprivation of one's transformations and the description of the paradoxes based on Einstein's postulates. Those are not axioms, which means that we do actually have to verify they are a prediction of how nature functions and experimental verification is needed to gain confidence that those postulates actually correct or realized in nature. And we have studied some of those tests already and just serves as a little bit of a review of the discussions we had to this point.
                        </p>
                        <p>
                        Welcome back to a special Relativity. So we're starting a new chapter in which we look at tests and implications of special Relativity. We started this entire discussion and deprivation of one's transformations and the description of the paradoxes based on Einstein's postulates. Those are not axioms, which means that we do actually have to verify they are a prediction of how nature functions and experimental verification is needed to gain confidence that those postulates actually correct or realized in nature. And we have studied some of those tests already and just serves as a little bit of a review of the discussions we had to this point.
                        </p>
                        <p>
                        Welcome back to a special Relativity. So we're starting a new chapter in which we look at tests and implications of special Relativity. We started this entire discussion and deprivation of one's transformations and the description of the paradoxes based on Einstein's postulates. Those are not axioms, which means that we do actually have to verify they are a prediction of how nature functions and experimental verification is needed to gain confidence that those postulates actually correct or realized in nature. And we have studied some of those tests already and just serves as a little bit of a review of the discussions we had to this point.
                        </p>
                    </div>
                </div>

                {/* video */}
                <div >
                    {/* <video width="400" height="240" controls>
                        <source src="movie.mp4" type="video/mp4"/>
                        <source src="movie.ogg" type="video/ogg"/>
                        Your browser does not support the video tag.
                    </video> */}
                    <VideoPlayer></VideoPlayer>
                </div>

            </div>
        </div>

    )
}