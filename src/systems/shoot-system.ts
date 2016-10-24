import {
  Engine, Entity, InputKeys, InputEventType, InputEvent,
} from "mu-engine";

import BulletEntity from "../entities/bullet-entity";

export default function ShootSystem(engine: Engine,
                                    entity: Entity,
                                    event: InputEvent): Engine {
  if (event.type === InputEventType.KEY_DOWN &&
      event.which === InputKeys.SPACE) {
    let bullet = (new BulletEntity())
      .setIn([ "position", "x" ], entity.getIn([ "position", "x"]) + 8.5)
      .setIn([ "position", "y" ], entity.getIn([ "position", "y"]) + 4);
    return engine.mkEntity(bullet);
  } else {
    return engine;
  }
}
