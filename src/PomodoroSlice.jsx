import { createSlice } from "@reduxjs/toolkit";

const pomodoroSlice = createSlice({
  name: "pomo",
  initialState: {
    timerLength: { pomo: 25, long: 15, short: 5 },
    secondsLeft: 20 * 60,
    isTimerOn: false,
    timerMode: "POMODORO",
    timerText: "start",
  },
  reducers: {
    countDown: (state) => {
      state.secondsLeft -= 1;
    },
    startTimer: (state) => {
      state.timerText = "pause";
    },
    pauseTimer: (state) => {
      state.timerText = "resume";
    },
    toggleTimer: (state) => {
      state.isTimerOn = !state.isTimerOn;
    },
    timesUp: (state) => {
      state.timerMode = "POMODORO";
      state.secondsLeft = state.timerLength.pomo * 60;
      state.isTimerOn = false;
      state.timerText = "start";
    },
    resetSecondsLeft: (state, action) => {
      if (action.payload === "LONG BREAK") {
        state.timerMode = action.payload;
        state.secondsLeft = state.timerLength.long * 60;
      } else if (action.payload === "SHORT BREAK") {
        // eslint-disable-next-line no-param-reassign
        state.timerMode = action.payload;
        state.secondsLeft = state.timerLength.short * 60;
      } else if (action.payload === "POMODORO") {
        state.timerMode = action.payload;
        state.secondsLeft = state.timerLength.pomo * 60;
      }
    },
  },
});

/// export actions

export const {
  resetSecondsLeft,
  timesUp,
  toggleTimer,
  pauseTimer,
  startTimer,
  countDown,
} = pomodoroSlice.actions;

/// exports timer state so it's easier to select.
/// ensure the name is correct i.e. matching the state named in the store

export const selectPromodo = (state) => state.pomodoro;

export const pomodoroReducer = pomodoroSlice.reducer;
