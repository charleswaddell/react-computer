function* program(n: number): Generator<number, number, void> {
  let m = 1;
  let count = 0;

  while (m++) {
    let isPrime = true;
    for (let i = 2; i < m - 1; i++) {
      if (m % i === 0) {
        isPrime = false;
        break;
      }
      yield 0;
    }

    if (isPrime) {
      count++;

      if (count === n) {
        // This is curious, TS wants me to not return here.
        break;
      }
    }
  }

  return m;
}

const name = "Prime Computer";

export { name, program };
