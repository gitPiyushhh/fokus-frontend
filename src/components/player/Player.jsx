import React, { useRef, useEffect } from "react";
import styles from "./Player.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeMusic, playPauseMusic } from "../../features/music/musicSlice";
import { open } from "../../features/ui/uiSlice";

function Player() {

  const { music, playing } = useSelector((state) => state.music);
  const audioRef = useRef(new Audio(`/assets/audio/${music}.mp4`));

  const dispatch = useDispatch();

  useEffect(() => {
    audioRef.current.src = `/assets/audio/${music}.mp4`;
    if (playing) {
      audioRef.current.play().catch((error) => console.error(error));
    }
  }, [music, playing]);

  const handlePlayPause = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    dispatch(playPauseMusic())
  };

  const handlePreviousPlay = () => {
    dispatch(changeMusic(`chill`));
    dispatch(open('pomodoro'))
  };

  const handleNextPlay = () => {
    dispatch(changeMusic(`moon`));
    dispatch(open('pomodoro'))
  };

  return (
    <div className={styles.player}>
      <button
        className={styles.player__button}
        aria-label="Previous Track"
        onClick={handlePreviousPlay}
      >
        ⏮️
      </button>

      <button
        className={styles.player__button}
        aria-label="Play/Pause"
        onClick={handlePlayPause}
      >
        {playing ? "⏸️" : "▶️"}
      </button>

      <button
        className={styles.player__button}
        aria-label="Next Track"
        onClick={handleNextPlay}
      >
        ⏭️
      </button>
    </div>
  );
}

export default Player;
