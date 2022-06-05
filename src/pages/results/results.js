import React from "react";
import VideoPlayer from "../../components/videoPlayer/videoPlayer";
import ChapterItem from "./components/chapterItem/chapterItem";
import styles from "./results.module.css";

export default function Results(props) {
  return (
    <div>
      <div className={styles.container}>
        {/* chapters */}
        <div className={styles.chapters}>
          <h3>Chapters</h3>
          <div className={styles.chaptersList}>
            <ChapterItem title="Kim Kardashian's failed her baby bar exam" start="00:00:00" end="00:00:08"/>
            <ChapterItem title="Kim Kardashian's failed her baby bar exam" start="00:00:09" end="00:03:54"/>
          </div>
        </div>

        {/* transcript */}

        <div className={styles.transcript}>
          <h2 className={styles.title}>
            The Exam that Kim Kardashian Failed.mp4
          </h2>
          <div className={styles.transcriptContent}>
            <span className={styles.fancyNumber}>1</span>
            <h4 className={styles.transcriptContentHeading}>Introduction</h4>
            <p>
              Welcome back to a special Relativity. So we're starting a new
              chapter in which we look at tests and implications of special
              Relativity. We started this entire discussion and deprivation of
              one's transformations and the description of the paradoxes based
              on Einstein's postulates. Those are not axioms, which means that
              we do actually have to verify they are a prediction of how nature
              functions and experimental verification is needed to gain
              confidence that those postulates actually correct or realized in
              nature. And we have studied some of those tests already and just
              serves as a little bit of a review of the discussions we had to
              this point.
            </p>
            <span className={styles.fancyNumber}>2</span>
            <h4 className={styles.transcriptContentHeading}>Introduction</h4>
            <p>
              Welcome back to a special Relativity. So we're starting a new
              chapter in which we look at tests and implications of special
              Relativity. We started this entire discussion and deprivation of
              one's transformations and the description of the paradoxes based
              on Einstein's postulates. Those are not axioms, which means that
              we do actually have to verify they are a prediction of how nature
              functions and experimental verification is needed to gain
              confidence that those postulates actually correct or realized in
              nature. And we have studied some of those tests already and just
              serves as a little bit of a review of the discussions we had to
              this point.
            </p>
            <span className={styles.fancyNumber}>3</span>
            <h4 className={styles.transcriptContentHeading}>Introduction</h4>
            <p>
              Welcome back to a special Relativity. So we're starting a new
              chapter in which we look at tests and implications of special
              Relativity. We started this entire discussion and deprivation of
              one's transformations and the description of the paradoxes based
              on Einstein's postulates. Those are not axioms, which means that
              we do actually have to verify they are a prediction of how nature
              functions and experimental verification is needed to gain
              confidence that those postulates actually correct or realized in
              nature. And we have studied some of those tests already and just
              serves as a little bit of a review of the discussions we had to
              this point.
            </p>
          </div>
        </div>

        {/* video */}
        <div className={styles.video}>
          <VideoPlayer></VideoPlayer>
          
        </div>

      </div>
    </div>
  );
}
