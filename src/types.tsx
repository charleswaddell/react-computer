export interface IProcessState {
  id: number;
  name: string;
  input: number;
  state: string;
  result: number | ImageData;
  pausable: boolean;
  unpausable: boolean;
  stoppable: boolean;
  pause: () => void;
  unpause: () => void;
  stop: () => void;
}

export interface IComputerState {
  processes: IProcessState[];
  startPrime: (input: number) => void;
  startMandelbrot: (maxIterations: number, imageData: ImageData) => void;
  startJulia: (maxIterations: number, imageData: ImageData) => void;
}
