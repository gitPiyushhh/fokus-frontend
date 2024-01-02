import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./features/ui/uiSlice";
import sceneReducer from "./features/scenes/sceneSlice";
import musicReducer from "./features/music/musicSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    music: musicReducer,
    scenes: sceneReducer,
  },
});

export default store;
