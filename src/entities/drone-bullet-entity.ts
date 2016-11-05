import * as Immutable from "immutable";

import { Entity, Component, Circle } from "mu-engine";

import { PositionComponent } from "mu-engine";
import { MovementComponent } from "mu-engine";
import { RenderComponent } from "mu-engine";
import DamageComponent from "../components/damage-component";

const mask = new Circle(1.5);

export default function(): Entity {
  return Immutable.Map<string,Component>({
    meta: undefined,
    position: (new PositionComponent(mask.dimensions())).set("mask", mask),
    render: new RenderComponent({
      shape: mask.path(),
      fill: "#f33c6d",
    }),
    movement: new MovementComponent({ restrict: "remove" }),
    damage: new DamageComponent({ value: 1, group: "B" }),
  });
}
