import { createSlice } from "@reduxjs/toolkit";

/* 
  State
 */
const initialState = {
  music: false,
  scene: false,
  pomodoro: true,
  buddy: false,
  calendar: false,
};

/* 
  Slice create
 */
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    open(state, action) {
      Object.keys(initialState).forEach((el) => {
        state[el] = false;
      });

      state[action.payload] = true;
    },
  },
});

export const { open } = uiSlice.actions;
export default uiSlice.reducer;
