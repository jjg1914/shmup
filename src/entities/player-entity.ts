import * as Immutable from "immutable";

import { Entity, Component, Polygon } from "mu-engine";

import { PositionComponent } from "mu-engine";
import { MovementComponent } from "mu-engine";
import { RenderComponent } from "mu-engine";
import TargetComponent from "../components/target-component";

const mask = new Polygon([
  [ 0, 20 ],
  [ 20, 20 ],
  [ 10, 0 ],
]);

export default function(): Entity {
  return Immutable.Map<string,Component>({
    meta: undefined,
    position: (new PositionComponent(mask.dimensions())).set("mask", mask),
    render: new RenderComponent({
      shape: mask.path(),
      stroke: "#00b6E4",
    }),
    movement: new MovementComponent({ restict: true }),
    target: new TargetComponent({ value: 1, group: "A" }),
  });
}
