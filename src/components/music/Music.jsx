import React from "react";
import { useDispatch } from "react-redux";

import styles from "./Music.module.scss";
import { changeMusic } from "../../features/music/musicSlice";
import { open } from "../../features/ui/uiSlice";

function Music() {
  const dispatch = useDispatch();

  return (
    <div className={styles.music}>
      <ul className={styles.music__list}>
        <li className={styles.music__item} onClick={() => {
            dispatch(changeMusic("jazz"));
            dispatch(open("pomodoro"));
          }}>
          <img
            src="/assets/images/Jazz.png"
            alt="List icon"
            className={styles.music__image}
            onClick={() => dispatch(changeMusic("jazz"))}
          />{" "}
          Jazzy
        </li>
        <li
          className={styles.music__item}
          onClick={() => {
            dispatch(changeMusic("moon"));
            dispatch(open("pomodoro"));
          }}
        >
          <img
            src="/assets/images/Moon.png"
            alt="List icon"
            className={styles.music__image}
          />{" "}
          Moon
        </li>
        <li
          className={styles.music__item}
          onClick={() => {
            dispatch(changeMusic(`base-${Math.floor(Math.random() * 2)}`));
            dispatch(open("pomodoro"));
          }}
        >
          <img
            src="/assets/images/Chai.png"
            alt="List icon"
            className={styles.music__image}
          />{" "}
          Chill
        </li>
      </ul>
    </div>
  );
}

export default Music;
