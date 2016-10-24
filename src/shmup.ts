import { Engine, IO } from "mu-engine";
import StageState from "./states/stage-state";

export default function Shmup(): IO<Engine> {
  return StageState(new Engine());
}
