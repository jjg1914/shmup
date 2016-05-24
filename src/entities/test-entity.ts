import "../poly.d.ts";

import * as Immutable from "immutable";

import PositionComponent from "../components/position-component";
import MovementComponent from "../components/movement-component";
import RenderComponent from "../components/render-component";

const shape = new Path2D();

shape.moveTo(0, 32);
shape.lineTo(32, 32);
shape.lineTo(15, 0);
shape.lineTo(0, 32);

export default Immutable.Record({
  meta: undefined,
  position: new PositionComponent({ x: 32, y: 32, width: 32, height: 32 }),
  render: new RenderComponent({
    shape: shape,
    stroke: "#00b6E4",
    strokeWidth: 2,
  }),
  movement: new MovementComponent(),
}, "TestEntity");