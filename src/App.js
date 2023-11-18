import "./App.css";
//import PromodoWihtoutRedux from "./PromodoWithoutRedux";
import Pomodoro from "./Pomodoro";
import { Box } from "@mui/material";

import wine_sea from "./assets/wine_sea.mp4";
function App() {
  document.title = "Pomodoro";

  // change the icon, must be an icon in assets

  const link = document.querySelector('link[rel="icon"]');
  link.setAttribute("href", "./sand-timer.ico");

  // pauses the video when window is not in view
  // courtesy of LogRocket :https://blog.logrocket.com/optimizing-video-backgrounds-css-javascript/#making-video-backgrounds-responsive
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  };

  // window load function around the observer so it observes after the page is loaded
  // adjusted from: https://stackoverflow.com/questions/58758085/intersectionobserver-observe-is-not-an-object-how-to-use-intersectionobserver
  window.onload = function () {
    let observer = new IntersectionObserver(callback, options);
    observer.observe(document.querySelector("#video-bg"));
  };

  return (
    <div className="App">
      <video
        className="vid_style"
        src={wine_sea}
        muted
        autoPlay
        loop
        id="video-bg"
      ></video>
      <Box
        position={"absolute"}
        display={"flex"}
        flexDirection={"row"}
        minWidth={"100%"}
        minHeight={"100%"}
        justifyContent={"center"}
        sx={{
          backgroundColor: "transparent",
        }}
      >
        <Pomodoro></Pomodoro>
      </Box>
    </div>
  );
}

export default App;
