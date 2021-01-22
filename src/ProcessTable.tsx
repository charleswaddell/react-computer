import ProcessTableHeader from "./ProcessTableHeader";
import ProcessTableRow from "./ProcessTableRow";

import { IProcessState } from "./types";

interface IProps {
  processes: IProcessState[];
  display: (imageData: ImageData) => void;
}

export default function ProcessTable({ processes, display }: IProps) {
  return (
    <table className="process-list">
      <caption>Process List</caption>
      <ProcessTableHeader />
      <tbody>
        {processes.map((process) => (
          <ProcessTableRow
            key={process.id}
            process={process}
            display={display}
          />
        ))}
      </tbody>
    </table>
  );
}
