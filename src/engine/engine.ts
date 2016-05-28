import * as Immutable from "immutable";
import { Runable } from "./runtime";
import IO from "./io";

export type Value = string | number | Function;
export type Component = Immutable.Map<string, Value>;
export type Entity = Immutable.Map<string,Component>;
export type System = (engine: Engine, event: Object) => Engine | IO<Engine>;
export type Iterator<T> = (value: T, entity: Entity) => T;

export class MetaComponent extends Immutable.Record({ id: 0 }) {
  public id: number;
}

export default class Engine extends Immutable.Record({
  entities: Immutable.Map(),
  state: Immutable.Stack(),
  id: 0,
}) implements Runable {
  private entities: Immutable.Map<string, Entity>;
  private state: Immutable.Stack<System>;
  private id: number;

  public mkEntity(entity: Entity): Engine {
    let newId = (this.id + 1).toString();
    let newEntity = entity.set("meta", new MetaComponent({ id: newId }));

    return <Engine> this.setIn([ "entities", newId ], newEntity)
      .set("id", Number(newId));
  };

  public upEntity(entity: Entity): Engine {
    let id = entity.getIn([ "meta", "id" ]);

    return <Engine> this.setIn([ "entities", id  ], entity);
  };

  public rmEntity(entity: Entity): Engine {
    let id = entity.getIn([ "meta", "id" ]);

    return <Engine> this.deleteIn([ "entities", id ]);
  };

  public pushState(state: System): Engine {
    return <Engine> this.set("state", this.state.push(state));
  };

  public popState(): Engine {
    return <Engine> this.set("state", this.state.pop());
  };

  public run(event: Object): this | IO<this> {
    return <this | IO<this>> this.runSystem(this.state.peek(), event);
  };

  public runSystem(system: System, event: Object): Engine | IO<Engine> {
    return system(this, event);
  };

  public runIterator(filters: string[],
                     iterator: Iterator<Engine>): Engine {
    return this.runIteratorOn(filters, iterator, this);
  }

  public runIteratorOn<T>(filters: string[],
                          iterator: Iterator<T>,
                          initial: T): T {
    return this.entities.filter((e: Entity): boolean => {
      return filters.every((f: string) => e.get(f) != undefined );
    }).reduce(iterator, initial);
  };
}