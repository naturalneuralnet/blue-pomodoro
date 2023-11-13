import { configureStore } from "@reduxjs/toolkit";
import { pomodoroReducer } from "./PomodoroSlice";

const store = configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
  },
});

export default store;
