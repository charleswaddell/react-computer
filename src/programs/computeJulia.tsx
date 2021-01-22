import { getPrettyColor as getColor } from "./getColor";

function* program(
  max: number,
  imageData: ImageData
): Generator<number, ImageData, void> {
  const height = imageData.height;
  const width = imageData.width;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // The pseudocode here was very helpful
      // https://en.wikipedia.org/wiki/Julia_set#Pseudocode
      let x0 = -1.5 + ((1.5 - -1.5) * x) / width;
      let y0 = -1 + ((1 - -1) * y) / height;
      let r = 0.285;
      let i = 0.01;
      let count = 0;
      while (x0 * x0 + y0 * y0 <= 4 && count < max) {
        let rtemp = x0 * x0 - y0 * y0;
        y0 = 2 * x0 * y0 + i;
        x0 = rtemp + r;
        count++;
        yield 0;
      }

      const { red, green, blue } = getColor(count, max);

      imageData.data[y * width * 4 + x * 4] = red;
      imageData.data[y * width * 4 + x * 4 + 1] = green;
      imageData.data[y * width * 4 + x * 4 + 2] = blue;
      imageData.data[y * width * 4 + x * 4 + 3] = 255;
    }
  }
  return imageData;
}

const name = "Julia Set";

export { name, program };
