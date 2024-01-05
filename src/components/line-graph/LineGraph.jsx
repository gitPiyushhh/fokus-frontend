import React from "react";
import styles from "./LineGraph.module.scss";

import { LineChart } from '@mui/x-charts/LineChart';

const piyushData = [0, 2, 3, 2.5]; //We just need to give this component the total number of pomodoros in 4 zones of time 
const harshData = [2, 1, 3, 0];
const xLabels = [
  '00:00-06:00',
  '06:00-12:00',
  '12:00-18:00',
  '18:00-00:00',
];

function LineGraph() {
  return (
    <div className={styles.lineGraph}>
      <LineChart
        width={400}
        height={250}
        series={[
          { data: piyushData, label: "Piyush" },
          { data: harshData, label: "Harsh" },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
    </div>
  );
}

export default LineGraph;
