import { createSlice } from "@reduxjs/toolkit";

/*
  State
*/
const initialState = {
  music: "moon-1",
};

/*
  Slice
*/
const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    changeMusic(state, action) {
      state.music = action.payload;
    },
  },
});

export const { changeMusic } = musicSlice.actions;

export default musicSlice.reducer;
