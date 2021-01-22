import { useState, useRef } from "react";

import Canvas from "./Canvas";
import ProcessPicker from "./ProcessPicker";
import ProcessTable from "./ProcessTable";
import { IComputerState } from "./types";

import "./App.css";

interface IProps {
  computer: IComputerState;
}

function App({ computer }: IProps) {
  const [imageData, setImageData] = useState<ImageData | undefined>(undefined);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const wrapper = (
    starter: (maxIterations: number, imageData: ImageData) => void
  ) => {
    return (input: number) => {
      if (canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        if (context) {
          starter(input, context.getImageData(0, 0, width, height));
        }
      }
    };
  };

  const wrappedStartMandelbrot = wrapper(computer.startMandelbrot);
  const wrappedStartJulia = wrapper(computer.startJulia);

  const display = (imageData: ImageData) => setImageData(imageData);

  return (
    <div>
      <Canvas canvasRef={canvasRef} imageData={imageData} />
      <ProcessPicker
        startPrime={computer.startPrime}
        startMandelbrot={wrappedStartMandelbrot}
        startJulia={wrappedStartJulia}
      />
      <ProcessTable processes={computer.processes} display={display} />
    </div>
  );
}

export default App;
