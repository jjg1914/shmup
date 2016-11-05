import * as Immutable from "immutable";

import { Entity, Component, Circle } from "mu-engine";

import { PositionComponent } from "mu-engine";
import { MovementComponent } from "mu-engine";
import { RenderComponent } from "mu-engine";
import { EmitterComponent } from "mu-engine";
import DamageComponent from "../components/damage-component";

const mask = new Circle(1.5);

export default function(): Entity {
  return Immutable.Map<string,Component>({
    meta: undefined,
    position: (new PositionComponent(mask.dimensions())).set("mask", mask),
    render: new RenderComponent({
      shape: mask.path(),
      fill: "#00b6E4",
    }),
    movement: new MovementComponent({ ySpeed: -256, restrict: "remove" }),
    damage: new DamageComponent({ value: 1, group: "A" }),
    emitter: new EmitterComponent({
      frequency: 50,
      lifetime: 50,
      fill: "#005399",
    }),
  });
}
