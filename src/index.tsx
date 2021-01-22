import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Process } from "./lib/Process";
import { IComputerState } from "./types";
import {
  program as computePrime,
  name as primeName,
} from "./programs/computePrime";
import {
  program as computeJulia,
  name as juliaName,
} from "./programs/computeJulia";
import {
  program as computeMandelbrot,
  name as mandelbrotName,
} from "./programs/computeMandelbrot";

const processes: Process[] = [new Process(primeName, 5000, computePrime(5000))];

(function compute() {
  const ticks = 10000;

  processes
    .filter(
      (process) =>
        process && !process.paused && !process.stopped && !process.completed
    )
    .forEach((process, _, { length }) =>
      process.tick(Math.floor(ticks / length))
    );

  const redraw = processes.reduce<boolean>(
    (redraw, process) => redraw || process.dirty,
    false
  );

  processes.forEach((process) => process.clean());

  if (redraw) {
    ReactDOM.render(
      <React.StrictMode>
        <App computer={getComputerState()} />
      </React.StrictMode>,
      document.getElementById("root")
    );
  }

  setTimeout(compute, 0);
})();

function getComputerState(): IComputerState {
  return {
    startPrime: (input: number) => {
      processes.push(new Process(primeName, input, computePrime(input)));
    },
    startMandelbrot: (input: number, imageData: ImageData) => {
      processes.push(
        new Process(mandelbrotName, input, computeMandelbrot(input, imageData))
      );
    },
    startJulia: (input: number, imageData: ImageData) => {
      processes.push(
        new Process(juliaName, input, computeJulia(input, imageData))
      );
    },
    processes: processes.map((process, index) => {
      return {
        id: index,
        name: process.name,
        input: process.input,
        state: process.completed
          ? "🥳"
          : process.stopped
          ? "😵"
          : process.paused
          ? "😴"
          : "🤔",
        result: process.result,
        pausable: !process.paused && !process.completed && !process.stopped,
        unpausable: process.paused && !process.completed && !process.stopped,
        stoppable: !process.stopped && !process.completed,
        pause: process.pause.bind(process),
        unpause: process.unpause.bind(process),
        stop: process.stop.bind(process),
      };
    }),
  };
}

ReactDOM.render(
  <React.StrictMode>
    <App computer={getComputerState()} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
