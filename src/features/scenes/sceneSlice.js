import { createSlice } from "@reduxjs/toolkit";

/*
  Initial state
*/
const initialState = {
  activeScene: "Forest",
};

/*
  Slice
*/
const scenesSclice = createSlice({
  name: "scenes",
  initialState,
  reducers: {
    changeScene(state, action) {
      state.activeScene = action.payload;
    },
  },
});

export const { changeScene } = scenesSclice.actions;

export default scenesSclice.reducer;
