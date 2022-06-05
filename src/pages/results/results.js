import React from 'react';
import VideoPlayer from '../../components/videoPlayer/videoPlayer';
import styles from './results.module.css';

export default function Results(props) {
    return (
        <div>

            <div className={styles.container}>

                {/* chapters */}
                <div className={styles.chapters}>
                    <h3>Chapters</h3>
                    <div className={styles.chaptersList}>
                        <div>
                            <span className={styles.fancyNumber}>1</span>
                            <div>
                            <p>Kim Kardashian's failed her baby bar exam</p>
                            </div>
                            
                        </div>
                        <div>
                            <span className={styles.fancyNumber}>2</span>
                            <div>
                            <p>Kim Kardashian's failed her baby bar exam</p>
                            </div>
                        </div>
                        <div>
                            <span className={styles.fancyNumber}>3</span>
                            <div>
                            <p>Kim Kardashian's failed her baby bar exam</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* transcript */}

                <div className={styles.transcript}>
                    <h2 className={styles.title}>
                        The Exam that Kim Kardashian Failed.mp4
                    </h2>
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
                    <VideoPlayer></VideoPlayer>
                </div>




            </div>
        </div>

    )
}