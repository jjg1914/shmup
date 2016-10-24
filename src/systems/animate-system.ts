import { Engine, Entity, IntervalEvent } from "mu-engine";

export default function AnimateSystem(engine: Engine,
                                      event: IntervalEvent ): Engine {
  return engine.runIterator([ "position", "animate" ],
                            (memo: Engine, entity: Entity): Engine => {
    let xR = entity.getIn([ "animate", "rotateSpeed" ]) * ( event.dt / 1000 );

    let r = (entity.getIn([ "position", "rotate" ]) + xR);

    return memo.upEntity(entity.setIn([ "position", "rotate" ], r));
  });
}
