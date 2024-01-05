import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./features/ui/uiSlice";
import sceneReducer from "./features/scenes/sceneSlice";
import musicReducer from "./features/music/musicSlice";
import pomodoroReducer from "./features/pomodoro/pomodoroSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    music: musicReducer,
    scenes: sceneReducer,
    pomodoro: pomodoroReducer,
  },
});

export default store;
