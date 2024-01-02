import React, { useEffect, useRef, useState } from "react";
import styles from "./Player.module.scss";

function Player() {
  const playlist = [
    "/assets/audio/base-0.mp4",
    "/assets/audio/base-1.mp4",
    "/assets/audio/base-2.mp4",
  ];
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(new Audio(`/assets/audio/base-1.mp4`));
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const handlePlayPause = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handlePreviousPlay = () => {
    const newIndex =
      (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(newIndex);
    updateAudioSource(playlist[newIndex]);
    setPlaying(true)
  };

  const handleNextPlay = () => {
    const newIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(newIndex);
    updateAudioSource(playlist[newIndex]);
    setPlaying(true)
  };

  const updateAudioSource = (src) => {
    audioRef.current.src = src;
    audioRef.current.play();
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
