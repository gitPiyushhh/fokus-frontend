import { createSlice } from "@reduxjs/toolkit";

/*
  State
*/
const initialState = {
  music: "jazz",
  playing: false,
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
      state.playing = true;
    },
    playPauseMusic(state) {
      state.playing = !state.playing;
    },
  },
});

/*
  Action creators
*/
export const { changeMusic, playPauseMusic } = musicSlice.actions;

/*
  Reducer
*/
export default musicSlice.reducer;
