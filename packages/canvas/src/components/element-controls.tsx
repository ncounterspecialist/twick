import { Control, controlsUtils } from "fabric";

export const disabledControl = new Control({
    x: 0,
    y: -0.5,
    offsetY: 0,
    cursorStyle: "pointer",
    actionHandler: () => {
      return true;
    },
    actionName: "scale",
    render: function (ctx: CanvasRenderingContext2D,
            left: number,
            top: number) {
      const size = 0;
      ctx.save();
      ctx.translate(left, top);
      ctx.fillStyle = "#red";
      ctx.fillRect(-size / 2, -size / 2, size, size);
      ctx.restore();
    },
  });

export const rotateControl = new Control({
    x: 0,
    y: -0.5,
    offsetY: -25,
    cursorStyle: "crosshair",
    actionHandler: controlsUtils.rotationWithSnapping,
    actionName: "rotate",
    withConnection: true,
  });