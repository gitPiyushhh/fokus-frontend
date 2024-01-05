// Pomodoro.jsx
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Pomodoro.module.scss";
import {
  breakUpdated,
  completed,
  created,
  updated,
} from "../../features/pomodoro/pomodoroSlice";

function Pomodoro() {
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [query, setQuery] = useState("");
  const [minLocal, setMinLocal] = useState(0);

  /*
    Global state 
  */
  let {
    minutes,
    seconds,
    breakMinutes,
    breakSeconds,
    cycleCompleted,
    isWorking,
    isBreaking,
    currentWorkingSeconds,
    currentBreakingSeconds,
    name,
  } = useSelector((state) => state.pomodoro);
  const dispatchGlobal = useDispatch();

  /*
    Event handlers
  */
  function handleSubmit(e) {
    if (!query) {
      alert("Please enter session name");
      return;
    }

    e.preventDefault();
    dispatchGlobal(created(query, minLocal));
    setQuery("");
  }

  /*
    Effects
  */
  useEffect(() => {
    if (isWorking) {
      const interval = setInterval(() => {
        if (seconds === 1) {
          setTimerCompleted(() => true);
        }

        if (minutes === 0 && seconds === 0) {
          return clearInterval(interval);
        } else {
          dispatchGlobal(updated());
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [dispatchGlobal, isWorking, minutes, seconds]);

  useEffect(() => {
    if (isBreaking) {
      const breakInterval = setInterval(() => {
        if ((breakMinutes === 0 && breakSeconds === 0) || cycleCompleted) {
          setTimerCompleted(false);
          dispatchGlobal(
            completed(new Date().getHours(), new Date().getMinutes())
          );
          cycleCompleted = true;
          return clearInterval(breakInterval);
        }
        dispatchGlobal(breakUpdated());
      }, 1000);

      return () => clearInterval(breakInterval);
    }
  }, [breakMinutes, breakSeconds, cycleCompleted, isWorking, isBreaking]);

  /*
    Derived state
  */
  const totalSeconds = isWorking
    ? minutes * 60 + seconds
    : breakMinutes * 60 + breakSeconds;
  const percentage = isWorking
    ? (totalSeconds / currentWorkingSeconds) * 100
    : (totalSeconds / currentBreakingSeconds) * 100;


  isWorking
    ? (currentWorkingSeconds += totalSeconds / 100)
    : (currentBreakingSeconds += totalSeconds / 100);

  /*
    JSX
  */
  return (
    <>
      <div className={styles.pomodoro__box}>
        {isWorking || isBreaking ? (
          <div className={styles.pomodoro__inner}>
            <div
              className={styles.pomodoro__progressbar}
              style={{ width: `${percentage}%` }}
            />

            {isWorking ? (
              <div className={styles.pomodoro__timer}>
                {String(minutes).padStart(2, "0")} :{" "}
                {String(seconds).padStart(2, "0")}
              </div>
            ) : (
              <div className={styles.pomodoro__timer}>
                {String(breakMinutes).padStart(2, "0")} :{" "}
                {String(breakSeconds).padStart(2, "0")}
              </div>
            )}
            <div className={styles.pomodoro__sessionType}>
              {isWorking
                ? `${name}`
                : breakSeconds !== 0 || breakMinutes !== 0
                ? "Break"
                : `Great '${name}' session complete, start a new one`}
            </div>
          </div>
        ) : (
          <div className={styles.pomodoro__add}>
            <input
              type="text"
              className={styles.pomodoro__input}
              value={query}
              name="query"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Give session name"
            />

            <form onSubmit={handleSubmit} className={styles.pomodoro__form}>
              <input
                type="text"
                className={styles.pomodoro__input}
                name="minutes"
                value={minutes > 0 ? minutes : null}
                onChange={(e) => setMinLocal(Number(e.target.value))}
                placeholder="Enter the minutes and &#9166;"
              />
            </form>

            <span
              className={styles.pomodoro__add__button}
              onClick={handleSubmit}
            >
              Go-fous
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default memo(Pomodoro);
