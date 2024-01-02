import React, { useEffect, useReducer, useState } from "react";
import styles from "./Clock.module.scss";

const intialState = {
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
  seconds: new Date().getSeconds(),
  Timezone: new Date().getHours() < 12 ? "Am" : "Pm",
};

function reducer(state, action) {
  switch (action.type) {
    case "clock/updated":
      return {
        ...state,
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds(),
        Timezone: new Date().getHours() < 12 ? "Am" : "Pm",
      };
    default:
      return state;
  }
}

function Clock() {
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(function () {
    const interval = setInterval(
        function() {
            dispatch({ type: "clock/updated" });
        }
    )

    return () => clearInterval(interval)
  }, [state]);
  return (
    <div className={styles.clock}>
      {state.hours < 12
        ? state.hours
        : state.hours % 12 === 0
        ? 12
        : state.hours % 12}{" "}
      : {String(state.minutes).padStart(2, "0")} {" "}
      {/* : {state.seconds < 10 ? `0` + state.seconds : state.seconds} &nbsp; */}
      {state.hours < 12 ? "AM" : "PM"}
    </div>
  );
}

export default Clock;
