import React, { useReducer } from "react";
import styles from "./Calendar.module.scss";

const intialState = {
  day: new Date().getDate(),
  month: new Date().toLocaleString("default", { month: "long" }),
  daysWorked: [],
  streak: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "calendar/created":
      return { ...state };

    case "calendar/dayWorked":
      // Adding day before completion
      if (state.daysWorked.includes(action.payload)) {
        alert("You already marked this day");
        return { ...state };
      }

      if (action.payload !== state.day) {
        alert(`Marking wrong day..`);
        return { ...state };
      }
      return { ...state, daysWorked: [...state.daysWorked, action.payload], streak: state.streak + 1 };

    default:
      return { state };
  }
}

function Calendar() {
  const [state, dispatch] = useReducer(reducer, intialState);

  function handleDayworked(day) {
    dispatch({ type: "calendar/dayWorked", payload: day });
  }

  function getDaysInMonth(year, monthName) {
    const monthNumber = new Date(`${monthName} 1, ${year}`).getMonth() + 1; // Adding 1 to make it 1-indexed
    const lastDay = new Date(year, monthNumber, 0);

    return lastDay.getDate();
  }

  const totalDays = getDaysInMonth(2024, state.month);

  return (
    <div className={styles.calendar}>
      <span className={styles.calendar__month}>{state.month}</span>

      <div className={styles.calendar__container}>
        {Array.from({ length: totalDays }, (_, index) => index + 1).map(
          (el) => (
            <div className={styles.calendar__dayContainer} key={el}>
              <div
                onClick={() => handleDayworked(el)}
                className={`${styles.calendar__day} ${
                  state.daysWorked.includes(el) ? styles.calendar__done : ""
                } ${state.day === el ? styles.today : ''}`}
              >
                {el}
              </div>
            </div>
          )
        )}
      </div>

      <span className={styles.calendar__streak}>STREAK: {state.streak} days</span>
    </div>
  );
}

export default Calendar;
