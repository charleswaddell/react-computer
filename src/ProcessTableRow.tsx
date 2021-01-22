import { IProcessState } from "./types";

interface IProps {
  process: IProcessState;
  display: (imageData: ImageData) => void;
}

export default function ProcessTableRow({ process, display }: IProps) {
  const {
    id,
    name,
    input,
    state,
    result,
    unpausable,
    pausable,
    stoppable,
    pause,
    unpause,
    stop,
  } = process;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{input}</td>
      <td>{state}</td>
      <td>
        {result === 0 ? (
          "❓"
        ) : result instanceof ImageData ? (
          <button type="button" onClick={() => display(result)}>
            Display
          </button>
        ) : (
          result
        )}
      </td>
      <td>
        {!unpausable && (
          <button disabled={!pausable} type="button" onClick={pause}>
            Pause
          </button>
        )}
        {unpausable && (
          <button disabled={pausable} type="button" onClick={unpause}>
            Unpause
          </button>
        )}
      </td>
      <td>
        <button disabled={!stoppable} type="button" onClick={stop}>
          Stop
        </button>
      </td>
    </tr>
  );
}
