import { Engine, IO, Path } from "mu-engine";

import BlockoidEntity from "../entities/blockoid-entity";

import DroneEntity from "../entities/drone-entity";
import DronePath1 from "../paths/drone1-path";

import { Shoot } from "./shoot-helper";

export function Blockoid(engine: Engine, x: number): IO<Engine> {
  let blockoid = BlockoidEntity()
    .setIn([ "position", "x" ], x)
    .setIn([ "position", "y" ], -20);

  return IO.Put(engine.mkEntity(blockoid));
}

export function Drone(engine: Engine, x: number): IO<Engine> {
  let drone = DroneEntity()
    .setIn([ "position", "x" ], x)
    .setIn([ "position", "y" ], -12);
  let path = Path(drone, DronePath1);
  drone = drone.setIn([ "path", "path" ], path);
  let newEngine = engine.mkEntity(drone);

  return IO.Put(newEngine).bind(() => {
    return Shoot(newEngine.lastEntity());
  });
}
