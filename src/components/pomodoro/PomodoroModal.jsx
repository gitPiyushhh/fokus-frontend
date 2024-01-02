import React from "react";
import styles from "./Pomodoro.module.scss"; // Adjust the import based on your file structure


function PomodoroModal() {
  return (
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
  );
}

export default PomodoroModal;
