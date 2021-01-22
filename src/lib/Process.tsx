export class Process {
  process: Generator<void, void, number>;
  name: string;
  input: number;
  result: number | ImageData;
  paused: boolean;
  stopped: boolean;
  completed: boolean;
  dirty: boolean;

  constructor(
    name: string,
    input: number,
    program: Generator<number, number | ImageData, void>
  ) {
    const that = this;

    this.name = name;
    this.input = input;
    this.result = 0;

    this.process = (function* (): Generator<void, void, number> {
      const process = program;
      while (true) {
        let ticks = yield;
        while (ticks > 0 && !that.paused && !that.stopped && !that.completed) {
          const { value, done } = process.next();

          if (done) {
            that.result = value;
            that.completed = true;
            that.dirty = true;

            return;
          }
          ticks--;
        }
      }
    })();

    // This just gets to the first yield where we can start ticking
    this.process.next();

    this.paused = false;
    this.stopped = false;
    this.completed = false;
    this.dirty = true;
  }

  tick(ticks: number) {
    this.process.next(ticks);
  }

  pause() {
    this.paused = true;
    this.dirty = true;
  }

  unpause() {
    this.paused = false;
    this.dirty = true;
  }

  stop() {
    this.stopped = true;
    this.dirty = true;
  }

  clean() {
    this.dirty = false;
  }
}
