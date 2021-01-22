import { useState } from "react";
import { name as primeName } from "./programs/computePrime";
import { name as mandelbrotName } from "./programs/computeMandelbrot";
import { name as juliaName } from "./programs/computeJulia";

interface IProps {
  startPrime: (input: number) => void;
  startMandelbrot: (input: number) => void;
  startJulia: (input: number) => void;
}

export default function ProcessPicker({
  startPrime,
  startMandelbrot,
  startJulia,
}: IProps) {
  const [input, setInput] = useState<number>(1000);
  const [type, setType] = useState<string>("");

  const start = () => {
    if (type === "prime") {
      startPrime(input);
    }

    if (type === "julia") {
      startJulia(input);
    }

    if (type === "mandelbrot") {
      startMandelbrot(input);
    }
  };
  return (
    <table className="process-starter">
      <caption>Process Starter</caption>
      <tbody>
        <tr>
          <th scope="row">Select Program</th>
          <td>
            <select onChange={(event) => setType(event.target.value)}>
              <option value="">--Program--</option>
              <option value="prime">{primeName}</option>
              <option value="mandelbrot">{mandelbrotName}</option>
              <option value="julia">{juliaName}</option>
            </select>
          </td>
        </tr>
        <tr>
          <th scope="row">Program Input</th>
          <td>
            <input
              type="number"
              value={input}
              onChange={(event) =>
                setInput(Number.parseInt(event.target.value))
              }
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <button
              disabled={type === ""}
              type="button"
              onClick={() => start()}
            >
              Start
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
