import { createSlice } from "@reduxjs/toolkit";

/*
  Initial state
*/
const initialState = {
  completedPomodoro: [
    // { name: "React", duration: 10, timeStarted: { hours: 9, minutes: 30 } },
    // { name: "Redux", duration: 15, timeStarted: { hours: 14, minutes: 45 } },
  ],
  minutes: null,
  seconds: 0,
  duration: null,
  breakMinutes: 5,
  breakSeconds: 0,
  cycleCompleted: false,
  isWorking: false,
  isBreaking: false,
  currentWorkingSeconds: 120,
  currentBreakingSeconds: 60,
  timeStarted: {
    hours: null,
    minutes: null,
  },
  name: "",
};

/*
  Slice
*/
const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState,
  reducers: {
    created: {
      prepare(query, minLocal) {
        return {
          payload: { query, minLocal },
        };
      },

      reducer(state, action) {
        state.isWorking = true;
        state.minutes = action.payload.minLocal;
        state.duration = action.payload.minLocal;
        state.seconds = 0;
        state.breakMinutes = 5; // Will change after test
        state.seconds = 0;
        state.currentWorkingSeconds = state.minutes * 60;
        state.currentBreakingSeconds = state.breakMinutes * 60;
        state.timeStarted = {
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
        };
        state.name = action.payload.query;
      },
    },

    updated(state) {
      state.minutes = state.seconds === 0 ? state.minutes - 1 : state.minutes;
      state.seconds = state.seconds === 0 ? 59 : state.seconds - 1;
      state.isWorking =
        state.minutes === 0 && state.seconds === 1
          ? !state.isWorking
          : state.isWorking;
      state.isBreaking =
        state.minutes === 0 && state.seconds === 1 ? true : false;
    },

    running: {
      prepare(minutes, seconds) {
        return {
          payload: { minutes, seconds },
        };
      },
      reducer(state, action) {
        state.minutes = action.payload.minutes;
        state.seconds = action.payload.seconds;
      },
    },

    breakStart(state) {
      state.isBreaking = true;
    },

    breakUpdated(state) {
      state.breakMinutes =
        state.breakSeconds === 0 ? state.breakMinutes - 1 : state.breakMinutes;
      state.breakSeconds =
        state.breakSeconds === 0 ? 59 : state.breakSeconds - 1;
    },

    completed: {
      prepare(endHours, endMinutes) {
        return {
          payload: { endHours, endMinutes },
        };
      },

      reducer(state, action) {
        const completedPomodoroEl = {
          name: state.name,
          duration: state.duration,
          timeStarted: state.timeStarted,
          timeEnded: {
            hours: action.payload.endHours,
            minutes: action.payload.endMinutes,
          },
        };

        state.isBreaking = false;
        state.completedPomodoro = [
          ...state.completedPomodoro,
          completedPomodoroEl,
        ];
      },
    },
  },
});

/*
  Action creator
*/
export const {
  created,
  updated,
  running,
  breakStart,
  breakUpdated,
  completed,
} = pomodoroSlice.actions;

/*
  Reducer
*/
export default pomodoroSlice.reducer;
