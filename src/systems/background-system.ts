import { RenderEvent } from "mu-engine";

export default function RenderSystem(event: RenderEvent): void {
  event.ctx.fillStyle = "#282828";
  event.ctx.strokeStyle = "#005399";
  event.ctx.fillRect(0, 0, event.width, event.height);

  let offset = 8;

  for (let i = offset; i < event.width; i += 16) {
    event.ctx.beginPath();
    event.ctx.moveTo(i, 0);
    event.ctx.lineTo(i, event.height);
    event.ctx.stroke();
  }

  for (let i = 8; i < event.height; i += 16) {
    event.ctx.beginPath();
    event.ctx.moveTo(0, i);
    event.ctx.lineTo(event.width, i);
    event.ctx.stroke();
  }
}
