import { createSlice } from "@reduxjs/toolkit";

const promodoSlice = createSlice({
  name: "promo",
  initialState: {
    timerLength: { pomo: 25, long: 15, short: 5 },
    secondsLeft: 20 * 60,
    isTimerOn: false,
    timerMode: "POMODORO",
    timerText: "start",
  },
  reducers: {
    /// think i can get rid of this and just use reset seconds left
    // changeTimerMode: (state, action) => {
    //   state.timerMode = action.payload;
    //   /// should it really be start all the time?
    //   state.timerText = "start";
    // },

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
} = promodoSlice.actions;

/// exports the entire timer state so you dont have to useSelect every little bit of state
/// exports the state to the store, the name in the store must match this
export const selectPromodo = (state) => state.promodo;
/// export reducer
export const promodoReducer = promodoSlice.reducer;
