import {
  Runtime, RuntimeCallback, Engine, Interval, Render, Input, Particle
} from "mu-engine";

import Shmup from "./shmup";

document.addEventListener("DOMContentLoaded", () => {
  Runtime(Shmup(), (cb: RuntimeCallback<Engine>): void => {
    let stage = <HTMLCanvasElement> document.getElementById("stage");
    let renderer = Render(stage, {
      width: 208,
      height: 256,
      scale: 2,
      smoothing: false,
    });
    let particle = Particle();

    Interval(60, renderer(particle(cb)));
    Input(stage, cb);
  });
});
