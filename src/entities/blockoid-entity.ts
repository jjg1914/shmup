import * as Immutable from "immutable";

import { Entity, Component } from "mu-engine";

import { PositionComponent } from "mu-engine";
import { MovementComponent } from "mu-engine";
import { AnimateComponent } from "mu-engine";
import { RenderComponent } from "mu-engine";
import TargetComponent from "../components/target-component";

export default function(): Entity {
  return Immutable.Map<string,Component>({
    meta: undefined,
    position: new PositionComponent({
      width: 24,
      height: 24,
      rotate: Math.PI / 4,
    }),
    render: new RenderComponent({
      stroke: "#aeea1c",
      strokeWidth: 1,
    }),
    movement: new MovementComponent({
      ySpeed: 32,
      restrict: "remove",
    }),
    animate: new AnimateComponent({
      rotateSpeed: Math.PI / 4,
    }),
    target: new TargetComponent({ value: 3, group: "B" }),
  });
}
