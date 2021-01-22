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
      // https://en.wikipedia.org/wiki/Mandelbrot_set#Computer_drawings
      let x0 = -2.5 + ((1 - -2.5) * x) / width;
      let y0 = -1 + ((1 - -1) * y) / height;
      let r = 0;
      let i = 0;
      let count = 0;
      while (r * r + i * i <= 2 * 2 && count < max) {
        let rtemp = r * r - i * i + x0;
        i = 2 * r * i + y0;
        r = rtemp;
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

const name = "Mandelbrot Set";

export { name, program };
