import { Engine, IO, Path } from "mu-engine";

import BlockoidEntity from "../entities/blockoid-entity";

import DroneEntity from "../entities/drone-entity";

import { Shoot } from "./shoot-helper";

export function Blockoid(engine: Engine, x: number): IO<Engine> {
  let blockoid = (new BlockoidEntity())
    .setIn([ "position", "x" ], x)
    .setIn([ "position", "y" ], -20);

  return IO.Put(engine.mkEntity(blockoid));
}

export function Drone(engine: Engine, x: number): IO<Engine> {
  let drone = (new DroneEntity())
    .setIn([ "position", "x" ], x)
    .setIn([ "position", "y" ], -12);
  // tslint:disable-next-line:no-require-imports
  let path = Path(drone, require("../paths/drone1-path"));
  drone = drone.setIn([ "movement", "path" ], path);
  let newEngine = engine.mkEntity(drone);

  return IO.Put(newEngine).bind(() => {
    return Shoot(newEngine.lastEntity());
  });
}
