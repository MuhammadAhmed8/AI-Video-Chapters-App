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
            <ChapterItem title="Kim Kardashian's failed her baby bar exam" start="00:00:00" end="00:01:08"/>
            <ChapterItem title="An essay on torts law" start="00:01:09" end="00:03:54"/>
            <ChapterItem title="What crimes can Doug be charged with?" start="00:03:55" end="00:05:54"/>
            <ChapterItem title="The fourth question in the exam" start="00:05:55" end="00:10:12"/>
            <ChapterItem title="The fourth question in the exam" start="00:05:55" end="00:10:12"/>
            <ChapterItem title="The fourth question in the exam" start="00:05:55" end="00:10:12"/>
            <ChapterItem title="The fourth question in the exam" start="00:05:55" end="00:10:12"/>
            <ChapterItem title="The fourth question in the exam" start="00:05:55" end="00:10:12"/>
            <ChapterItem title="The fourth question in the exam" start="00:05:55" end="00:10:12"/>
            <ChapterItem title="The fourth question in the exam" start="00:05:55" end="00:10:12"/>
          </div>
        </div>

        {/* transcript */}

        <div className={styles.transcript}>
          <h2 className={styles.title}>
            The Exam that Kim Kardashian Failed.mp4
          </h2>
          <div className={styles.transcriptContent}>
            <span className={styles.fancyNumber}>1</span>
            <h4 className={styles.transcriptContentHeading}>Kim Kardashian's failed her baby bar exam</h4>
            <p>
            Something you might know if you've seen any of my videos is that I find it interesting to take a look at the different exams that people have to sit around the world and for various subjects. So when one particular exam was in the news recently, I was intrigued to take a look at it. Last week, Kim Kardashian revealed that she had failed her baby bar exam, something taken by First-Year law students in California before they're able to go on and study for three more years to eventually take the big Californian bar exam, which would qualify them to practice as an attorney. The fact that Kim is even studying law may be news to you. That's OK.
            </p>
            <span className={styles.fancyNumber}>2</span>
            <h4 className={styles.transcriptContentHeading}>An essay on torts law</h4>
            <p>
            The exam goes for seven hours and consists of essays and multiple choice questions. These are some of the essay questions. The first one is about torts law, which is when someone commits a role against another person, it says. Mallon was late for an important meeting and was driving at least 35 miles an hour on a residential road. The speed limit on this road was 30 miles per hour as Mel rounded a curve in the road. Nigel suddenly backed out of his driveway in front of M. Mal's headlights were on and his lights would have been visible if a driver had looked carefully to avoid hitting Nigel's car. Malveaux's braked hard and turned into the center of the street, crossing a yellow line and partially entering the lane of oncoming traffic.
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
