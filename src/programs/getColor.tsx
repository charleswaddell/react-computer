function lerp(start: number, end: number, ratio: number) {
  return start * (1 - ratio) + end * ratio;
}

function getLerpColor(count: number, max: number) {
  const start = { red: 0, green: 0, blue: 70 };
  const end = { red: 0, green: 255, blue: 0 };
  const ratio = count / max;

  return count === max
    ? { red: 0, green: 0, blue: 0 }
    : {
        red: lerp(start.red, end.red, ratio),
        green: lerp(start.green, end.green, ratio),
        blue: lerp(start.blue, end.blue, ratio),
      };
}

// This lovely palette was taken from here
// https://stackoverflow.com/questions/16500656/which-color-gradient-is-used-to-color-mandelbrot-in-wikipedia
const palette = [
  { red: 66, green: 30, blue: 15 },
  { red: 25, green: 7, blue: 26 },
  { red: 9, green: 1, blue: 47 },
  { red: 4, green: 4, blue: 73 },
  { red: 0, green: 7, blue: 100 },
  { red: 12, green: 44, blue: 138 },
  { red: 24, green: 82, blue: 177 },
  { red: 57, green: 125, blue: 209 },
  { red: 134, green: 181, blue: 229 },
  { red: 211, green: 236, blue: 248 },
  { red: 241, green: 233, blue: 191 },
  { red: 248, green: 201, blue: 95 },
  { red: 255, green: 170, blue: 0 },
  { red: 204, green: 128, blue: 0 },
  { red: 153, green: 87, blue: 0 },
  { red: 106, green: 52, blue: 3 },
];

function getPrettyColor(count: number, max: number) {
  return count < max && count > 0
    ? palette[count % 16]
    : { red: 0, green: 0, blue: 0 };
}

export { getLerpColor, getPrettyColor };
