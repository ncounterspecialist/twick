import { Control, controlsUtils } from "fabric";

/**
 * Disabled control for canvas elements.
 * Creates a control that appears disabled and doesn't perform any actions
 * when interacted with. Useful for showing non-interactive control points.
 * 
 * @example
 * ```js
 * import { disabledControl } from '@twick/canvas';
 * 
 * // Apply to a canvas object
 * object.setControlsVisibility({
 *   mt: false, // Disable top control
 *   mb: false, // Disable bottom control
 *   ml: false, // Disable left control
 *   mr: false, // Disable right control
 *   bl: disabledControl, // Use disabled control for bottom-left
 * });
 * ```
 */
export const disabledControl = new Control({
    /** X position offset */
    x: 0,
    /** Y position offset */
    y: -0.5,
    /** Additional Y offset */
    offsetY: 0,
    /** Cursor style when hovering */
    cursorStyle: "pointer",
    /** Action handler that does nothing */
    actionHandler: () => {
      return true;
    },
    /** Name of the action */
    actionName: "scale",
    /** Render function for the control */
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

/**
 * Rotation control for canvas elements.
 * Creates a control that allows rotation of canvas objects with snapping
 * functionality for precise angle adjustments.
 * 
 * @example
 * ```js
 * import { rotateControl } from '@twick/canvas';
 * 
 * // Apply to a canvas object
 * object.setControlsVisibility({
 *   mtr: rotateControl, // Use custom rotate control for top-right
 * });
 * 
 * // Enable rotation
 * object.set({
 *   hasRotatingPoint: true,
 *   lockRotation: false
 * });
 * ```
 */
export const rotateControl = new Control({
    /** X position offset */
    x: 0,
    /** Y position offset */
    y: -0.5,
    /** Additional Y offset for positioning */
    offsetY: -25,
    /** Cursor style when hovering */
    cursorStyle: "crosshair",
    /** Action handler with rotation and snapping */
    actionHandler: controlsUtils.rotationWithSnapping,
    /** Name of the action */
    actionName: "rotate",
    /** Whether to show connection line */
    withConnection: true,
  });