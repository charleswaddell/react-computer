import { useEffect } from "react";

interface ICanvasProps {
  imageData?: ImageData;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export default function Canvas({ canvasRef, imageData }: ICanvasProps) {
  useEffect(() => {
    if (imageData) {
      canvasRef?.current?.getContext("2d")?.putImageData(imageData, 0, 0);
    }
  }, [canvasRef, imageData]);

  return (
    <div className="canvas">
      <span>Fun With Generators</span>
      <canvas ref={canvasRef} width={800} height={600}></canvas>
    </div>
  );
}
