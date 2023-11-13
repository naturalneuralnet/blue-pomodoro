import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import mech from "./assets/mech-keyboard-02.mp3";

import ding from "./assets/ding.mp3";

import { useDispatch, useSelector } from "react-redux";

import {
  selectPromodo,
  timesUp,
  resetSecondsLeft,
  toggleTimer,
  pauseTimer,
  startTimer,
  countDown,
} from "./PomodoroSlice";

let finishedAudio = new Audio(ding);

const Pomodoro = () => {
  const dispatch = useDispatch();

  const [pomoColor, setPomoColor] = useState(true);
  const [shortColor, setShortColor] = useState(false);
  const [longColor, setLongColor] = useState(false);
  const audio1 = new Audio(mech);
  audio1.volume = 0.1;

  finishedAudio.volume = 0.6;

  const font = "Tahoma";

  const { timerLength, timerMode, secondsLeft, isTimerOn, timerText } =
    useSelector(selectPromodo);

  // changes the state of the timer based on which button is clicked
  const handleControls = (e) => {
    audio1.play();
    const mode = String(e.target.innerText);
    dispatch(resetSecondsLeft(mode));
  };

  const handleClick = () => {
    audio1.play();
    dispatch(toggleTimer());
    if (
      timerText === "start" ||
      timerText === "resume" ||
      timerText === "restart"
    ) {
      dispatch(startTimer());
    } else if (timerText === "pause") {
      dispatch(pauseTimer());
    }

    if (secondsLeft === 0) {
      finishedAudio.play();
      dispatch(timesUp());
    }
  };

  // converts seconds to minutes and seconds
  const convertTime = (seconds) => {
    /// calculate minutes
    let mins = Math.floor(seconds / 60);
    /// calculate seconds
    let secs = seconds - mins * 60;
    // add a 0 if less than 10
    if (mins < 10) {
      mins = `0${mins}`;
    }
    if (secs < 10) {
      secs = `0${secs}`;
    }
    /// put together as text
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    let tick;
    if (isTimerOn) {
      // dispatches the countdown to tick down with an interval of a second

      tick = setInterval(() => {
        dispatch(countDown());
      }, 1000);
    }

    // changes the color of the button depending on which mode the timer is in
    if (timerMode === "POMODORO") {
      setPomoColor(true);
      setShortColor(false);
      setLongColor(false);
    } else if (timerMode === "SHORT BREAK") {
      setShortColor(true);
      setPomoColor(false);
      setLongColor(false);
    } else if (timerMode === "LONG BREAK") {
      setLongColor(true);
      setShortColor(false);
      setPomoColor(false);
    }

    if (secondsLeft === 0) {
      finishedAudio.play();

      dispatch(timesUp());

      clearInterval(tick);
    }

    return () => clearInterval(tick);
  }, [secondsLeft, timerLength, timerMode, isTimerOn, dispatch]);

  return (
    <>
      <Box
        display={"flex"}
        position={"absolute"}
        margin={"30px 5px 0px 5px"}
        minWidth={{ lg: "30%", md: "20%", sm: "10%", xs: "5%" }}
        padding={"10px"}
        minHeight={"auto"}
        sx={{
          backgroundColor: "rgb(0, 11, 24, 0.9)",
          borderRadius: "20px",
          boxShadow: "0px 5px #1a232f",
        }}
        justifyContent={"center"}
      >
        {/* ROW OF BUTTONS */}
        <Stack spacing={6} marginTop={"10px"}>
          <Box
            className="title-box"
            sx={{
              backgroundColor: "#1a232f",
              borderRadius: "20px",
            }}
          >
            <Typography
              color={"white"}
              fontFamily={font}
              fontSize={{ lg: "45px", md: "38px", sm: "30px", xs: "20px" }}
            >
              POMODORO
            </Typography>
          </Box>
          <Box>
            <Stack direction={"row"} spacing={3}>
              <Button
                className="pressed"
                sx={{
                  backgroundColor: pomoColor ? "#000b18" : "whitesmoke",
                }}
                onClick={(e) => handleControls(e)}
              >
                <Typography
                  className={"pressed_text"}
                  color={pomoColor ? "whitesmoke" : "#1a232f"}
                  fontFamily={font}
                  fontSize={{ lg: "16px", md: "13px", sm: "10px", xs: "9px" }}
                >
                  Pomodoro
                </Typography>
              </Button>
              <Button
                className="pressed"
                sx={{
                  backgroundColor: shortColor ? "#000b18" : "whitesmoke",
                }}
                onClick={(e) => handleControls(e)}
              >
                <Typography
                  padding={"2px"}
                  className={"pressed_text"}
                  color={shortColor ? "whitesmoke" : "#1a232f"}
                  fontFamily={font}
                  fontSize={{ lg: "16px", md: "13px", sm: "10px", xs: "9px" }}
                >
                  Short Break
                </Typography>
              </Button>
              <Button
                className="pressed"
                size="small"
                sx={{
                  backgroundColor: longColor ? "#000b18" : "whitesmoke",
                }}
                onClick={(e) => handleControls(e)}
              >
                <Typography
                  className={"pressed_text"}
                  color={longColor ? "whitesmoke" : "#1a232f"}
                  fontFamily={font}
                  fontSize={{ lg: "16px", md: "13px", sm: "10px", xs: "9px" }}
                >
                  Long Break
                </Typography>
              </Button>
            </Stack>
          </Box>
          <Box>
            <Typography
              color={"white"}
              fontFamily={font}
              fontSize={{ lg: "48px", md: "40px", sm: "30px", xs: "20px" }}
            >
              {convertTime(secondsLeft)}
            </Typography>
          </Box>
          <Box>
            <Button
              className="pressed"
              size="small"
              sx={{
                borderRadius: "20px",
                backgroundColor: "whitesmoke",
              }}
              onClick={() => {
                handleClick();
              }}
            >
              <Typography
                padding={"2px"}
                className={"pressed_text"}
                color={"#1a232f"}
                fontFamily={font}
                fontSize={{ lg: "45px", md: "36px", sm: "22px", xs: "15px" }}
              >
                {timerText}
              </Typography>
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Pomodoro;
