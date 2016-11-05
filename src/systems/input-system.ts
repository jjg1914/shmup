import {
  Engine, Entity, InputKeys, InputEventType, InputEvent,
} from "mu-engine";

export default function InputSystem(engine: Engine,
                                    entity: Entity,
                                    event: InputEvent): Engine {
  let coeff = 0;

  switch (event.type) {
    case InputEventType.KEY_UP:
      coeff = -1;
      break;
    case InputEventType.KEY_DOWN:
      coeff = 1;
      break;
    default:
      break;
  }

  let xSpeed = entity.getIn([ "movement", "xSpeed" ]);
  let ySpeed = entity.getIn([ "movement", "ySpeed" ]);

  switch (event.which) {
    case InputKeys.ARROW_LEFT:
      xSpeed += -64 * coeff;
      break;
    case InputKeys.ARROW_RIGHT:
      xSpeed += 64 * coeff;
      break;
    case InputKeys.ARROW_UP:
      ySpeed += -64 * coeff;
      break;
    case InputKeys.ARROW_DOWN:
      ySpeed += 64 * coeff;
      break;
    default:
      break;
  }

  return engine.upEntity(entity.setIn([ "movement", "xSpeed" ], xSpeed)
                               .setIn([ "movement", "ySpeed" ], ySpeed));
}
