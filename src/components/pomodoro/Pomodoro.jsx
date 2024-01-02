// Pomodoro.jsx
import React, { memo, useEffect, useReducer, useState } from "react";
import styles from "./Pomodoro.module.scss"; // Adjust the import based on your file structure

const initialState = {
  minutes: 1,
  seconds: 0,
  breakMinutes: 1,
  breakSeconds: 0,
  isWorking: false,
  isBreaking: false,
  sessionName: "Clear the dom and write a twitter post",
};

function reducer(state, action) {
  switch (action.type) {
    case "pomodoro/added":
      return {
        ...state,
        isWorking: true,
        sessionName: action.payload,
      };

    case "pomodoro/updated":
      return {
        ...state,
        seconds: state.seconds === 0 ? 59 : state.seconds - 1,
        minutes: state.seconds === 0 ? state.minutes - 1 : state.minutes,
        isWorking:
          state.minutes === 0 && state.seconds === 1
            ? !state.isWorking
            : state.isWorking,
        isBreaking: state.minutes === 0 && state.seconds === 1 ? true : false,
      };

    case "pomodoro/breakStart":
      return {
        ...state,
        isBreaking: true,
      };

    case "pomodoro/breakUpdated":
      return {
        ...state,
        breakSeconds: state.breakSeconds === 0 ? 59 : state.breakSeconds - 1,
        breakMinutes:
          state.breakSeconds === 0
            ? state.breakMinutes - 1
            : state.breakMinutes,
      };

    case "pomodoro/breakEnded":
      return initialState;

    default:
      return state;
  }
}

function Pomodoro() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [query, setQuery] = useState("");

  /*
    Event handlers
  */
  function handleSubmit(e) {
    if(!query) {
      alert('Please enter session name');
      return;
    }

    e.preventDefault();
    dispatch({ type: "pomodoro/added", payload: query });
    setQuery("");
  }

  /*
    Effects
  */
  useEffect(() => {
    // Check if isWorking is true before starting the timer
    if (state.isWorking) {
      const interval = setInterval(() => {
        if(state.seconds === 1) {
          setTimerCompleted(() => true);
        }

        if (state.minutes === 0 && state.seconds === 0) {
          return clearInterval(interval);
        } else {
          dispatch({ type: "pomodoro/updated" });
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [state]);

  useEffect(() => {
    if (timerCompleted && state.isBreaking) {
      const breakInterval = setInterval(() => {
        if (state.breakMinutes === 0 && state.breakSeconds === 0) {
          setTimerCompleted(false);
          dispatch({ type: "pomodoro/breakEnded" });
          return clearInterval(breakInterval);
        }
        dispatch({ type: "pomodoro/breakUpdated" });
      }, 1000);

      return () => clearInterval(breakInterval);
    }
  }, [timerCompleted, state]);

  /*
    Derived state
  */
  const totalSeconds = state.isWorking
    ? state.minutes * 60 + state.seconds
    : state.breakMinutes * 60 + state.breakSeconds;
  const percentage = (totalSeconds / (1 * 60)) * 100; // Change 1 min with pomodoro length

  /*
    JSX
  */
  return (
    <>
      <div className={styles.pomodoro__box}>
        {state.isWorking || state.isBreaking ? (
          <div className={styles.pomodoro__inner}>
            <div
              className={styles.pomodoro__progressbar}
              style={{ width: `${percentage}%` }}
            />

            {state.isWorking ? (
              <div className={styles.pomodoro__timer}>
                {String(state.minutes).padStart(2, "0")} :{" "}
                {String(state.seconds).padStart(2, "0")}
              </div>
            ) : (
              <div className={styles.pomodoro__timer}>
                {String(state.breakMinutes).padStart(2, "0")} :{" "}
                {String(state.breakSeconds).padStart(2, "0")}
              </div>
            )}
            <div className={styles.pomodoro__sessionType}>
              {state.isWorking
                ? `${state.sessionName}`
                : state.breakSeconds !== 0 || state.breakMinutes !== 0
                ? "Break"
                : `Great '${state.sessionName}' session complete, start a new one`}
            </div>
          </div>
        ) : (
          <div className={styles.pomodoro__add}>
            <form onSubmit={handleSubmit} className={styles.pomodoro__form}>
              <input
                type="text"
                className={styles.pomodoro__input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Give session name and  &#9166;"
              />
            </form>

            <span className={styles.pomodoro__add__button} onClick={handleSubmit}>Go-fous</span>
          </div>
        )}
      </div>
    </>
  );
}

export default memo(Pomodoro);
