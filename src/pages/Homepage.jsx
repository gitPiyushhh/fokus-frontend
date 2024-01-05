import React, { useEffect } from "react";
import styles from "./Homepage.module.scss";
import Actions from "../components/actions/Actions";
import Clock from "../components/clock/Clock";
import Pomodoro from "../components/pomodoro/Pomodoro";
import Music from "../components/music/Music";
import Signin from "../components/signin/Signin";
import Scenes from "../components/scenes/Scenes";
import Analytics from "../components/analytics/Analytics";
import { useSelector } from "react-redux";
import Player from "../components/player/Player";
import Logo from "../components/logo/Logo";
import Buddy from "../components/buddy/Buddy";

function Homepage() {
  /*
    Local state
  */
  const { music, scene, pomodoro, buddy, calendar, analytics } = useSelector(
    (state) => state.ui
  );
  const { activeScene } = useSelector((state) => state.scenes);

  const playAudio = async () => {
    try {
      const audio = new Audio(`/assets/audio/moon.mp3`);
      await audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  /*
    Effects
  */
  useEffect(function () {
    playAudio();
  }, []);

  /*
    JSX
  */
  return (
    <div className={styles.homepage}>
      <video
        key={activeScene}
        className={styles.homepage__video}
        autoPlay
        loop
        muted
      >
        <source src={`/assets/video/${activeScene}.mp4`} type="video/mp4" />
        Your browser doesn't support video.
      </video>

      <Player />
      <Logo />
      <Actions />
      <Clock />
      
      {pomodoro && <Pomodoro />}
      {analytics && <Analytics />}
      {music && <Music />}
      {buddy && <Buddy />}
      {scene && <Scenes />}

      <span className={styles.homepage__dev}>Created with 🤍 by Piyush</span>
    </div>
  );
}

export default Homepage;
