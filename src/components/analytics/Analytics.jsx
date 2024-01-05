import React from "react";
import styles from "./Analytics.module.scss";

import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";

import Calendar from "../calendar/Calendar.jsx";

const colors = ["#FFD700", "#FFA500", "#FF6347", "#87CEFA", "#191970"];

const determineColor = (hours, minutes) => {
  const time = hours * 60 + minutes;

  if (time >= 300 && time < 720) {
    // Morning (5:00 AM to 11:59 AM)
    return colors[0];
  } else if (time >= 720 && time < 1080) {
    // Afternoon (12:00 PM to 5:59 PM)
    return colors[1];
  } else if (time >= 1080 && time < 1320) {
    // Evening (6:00 PM to 9:59 PM)
    return colors[3];
  } else if ((time >= 0 && time < 300) || (time >= 1320 && time < 1440)) {
    // Night (12:00 AM to 4:59 AM, 10:00 PM to 11:59 PM)
    return colors[4];
  } else {
    // Default color
    return colors[2];
  }
};

function Analytics() {
  const { completedPomodoro } = useSelector((state) => state.pomodoro);

  /*
    Derived state
  */

  const tasks = completedPomodoro.map((pomodoro) => ({
    name: pomodoro.name,
    color: determineColor(
      pomodoro.timeStarted.hours,
      pomodoro.timeStarted.minutes
    ),
  }));

  const transformedData = completedPomodoro.map((pomodoro) => ({
    value: pomodoro.duration,
    color: determineColor(
      pomodoro.timeStarted.hours,
      pomodoro.timeStarted.minutes
    ),
  }));

  return (
    <div className={styles.analytics}>
      {tasks.length ? (
        <div className={styles.analytics__chart}>
          <PieChart
            series={[
              {
                data: [...transformedData],
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 180,
                cx: 150,
                cy: 150,
              },
            ]}
          />

          <div className={styles.analytics__list}>
            {tasks.map((task) => (
              <div className={styles.analytics__item}>
                <div
                  className={styles.analytics__shape}
                  style={{ backgroundColor: `${task.color}` }}
                >
                  &nbsp;
                </div>
                <p className={styles.analytics__text}>{task.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <span className={styles.analytics__emptyText}>
          No pomodoro sessions completed 😕
        </span>
      )}

      <Calendar />
    </div>
  );
}

export default Analytics;
