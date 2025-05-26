import { Canvas as FabricCanvas, FabricText, Group, Image, Rect, Shadow } from "fabric";
import { convertToCanvasPosition } from "../helpers/canvas.util";
import { CanvasElement, CanvasMetadata, CaptionProps, FrameEffect } from "../types";
import {
  DEFAULT_CAPTION_PROPS,
  DEFAULT_TEXT_PROPS,
} from "../helpers/constants";
import { disabledControl, rotateControl } from "./element-controls";
import { getObjectFitSize, getThumbnail } from "@twick/media-utils";

/**
 * Add a text element for the canvas.
 *
 * @param {Object} params - The parameters for creating the text element.
 * @param {CanvasElement} params.element - The canvas element configuration.
 * @param {number} params.index - The z-index of the element.
 * @param {CanvasMetadata} params.canvasMetadata - Metadata about the canvas, including scale and dimensions.
 * @returns {FabricText} The configured Fabric.js text object.
 */
export const addTextElement = ({
  element,
  index,
  canvas,
  canvasMetadata,
}: {
  element: CanvasElement;
  index: number;
  canvas: FabricCanvas;
  canvasMetadata: CanvasMetadata;
}) => {
  const { x, y } = convertToCanvasPosition(
    element.props?.x || 0,
    element.props?.y || 0,
    canvasMetadata
  );

  const text = new FabricText(element.name || "", {
    left: x,
    top: y,
    originX: "center",
    originY: "center",
    angle: element.props?.rotation || 0,
    fontSize: Math.round(
      (element.props?.fontSize || DEFAULT_TEXT_PROPS.size) *
        canvasMetadata.scaleX
    ),
    fontFamily: element.props?.fontFamily || DEFAULT_TEXT_PROPS.family,
    fontStyle: element.props?.fontStyle || "normal",
    fontWeight: element.props?.fontWeight || "normal",
    fill: element.props?.fill || DEFAULT_TEXT_PROPS.fill,
    stroke: element.props?.stroke || DEFAULT_TEXT_PROPS.stroke,
    strokeWidth: element.props?.lineWidth || DEFAULT_TEXT_PROPS.lineWidth,
    shadow: element.props?.shadowColor
      ? new Shadow({
          offsetX:
            element.props?.shadowOffset?.length &&
            element.props?.shadowOffset?.length > 1
              ? element.props.shadowOffset[0] / 2
              : 1,
          offsetY:
            element.props?.shadowOffset?.length &&
            element.props?.shadowOffset.length > 1
              ? element.props.shadowOffset[1] / 2
              : 1,
          blur: (element.props?.shadowBlur || 2) / 2,
          color: element.props?.shadowColor,
        })
      : undefined,
  });

  // Assign metadata and custom controls
  text.set("id", element.id);
  text.set("zIndex", index);

  // Disable unwanted control points
  text.controls.mt = disabledControl;
  text.controls.mb = disabledControl;
  text.controls.ml = disabledControl;
  text.controls.mr = disabledControl;
  text.controls.bl = disabledControl;
  text.controls.br = disabledControl;
  text.controls.tl = disabledControl;
  text.controls.tr = disabledControl;
  text.controls.mtr = rotateControl;

  canvas.add(text);
  return text;
};

/**
 * Add a caption element for the canvas based on provided props.
 *
 * @param {Object} params - Parameters for creating the caption.
 * @param {CanvasElement} params.element - The canvas element configuration.
 * @param {FabricCanvas} params.canvas - The Fabric.js canvas instance.
 * @param {number} params.index - The z-index of the element.
 * @param {CaptionProps} params.captionProps - Default and user-defined caption properties.
 * @param {CanvasMetadata} params.canvasMetadata - Metadata about the canvas, including scale and dimensions.
 * @returns {FabricText} The configured Fabric.js caption object.
 */
export const addCaptionElement = ({
  element,
  index,
  canvas,
  captionProps,
  canvasMetadata,
}: {
  element: CanvasElement;
  index: number;
  canvas: FabricCanvas;
  captionProps: CaptionProps;
  canvasMetadata: CanvasMetadata;
}) => {
  const { x, y } = convertToCanvasPosition(
    element.props?.pos?.x || captionProps?.pos?.x || 0,
    element.props?.pos?.y || captionProps?.pos?.y || 0,
    canvasMetadata
  );

  const caption = new FabricText(element.name || "", {
    left: x,
    top: y,
    originX: "center",
    originY: "center",
    angle: element.props?.rotation || 0,
    fontSize: Math.round(
      (element.props?.font?.size ||
        captionProps.font?.size ||
        DEFAULT_CAPTION_PROPS.size) * canvasMetadata.scaleX
    ),
    fontFamily:
      element.props?.font?.family ||
      captionProps.font?.family ||
      DEFAULT_CAPTION_PROPS.family,
    fill:
      element.props?.fill ||
      captionProps.color?.text ||
      DEFAULT_CAPTION_PROPS.fill,
    fontWeight: DEFAULT_CAPTION_PROPS.fontWeight,
    stroke: element.props?.stroke || DEFAULT_CAPTION_PROPS.stroke,
    shadow: new Shadow({
      offsetX:
        element.props?.shadowOffset?.[0] ||
        DEFAULT_CAPTION_PROPS.shadowOffset?.[0],
      offsetY:
        element.props?.shadowOffset?.[1] ||
        DEFAULT_CAPTION_PROPS.shadowOffset?.[1],
      blur: element.props?.shadowBlur || DEFAULT_CAPTION_PROPS.shadowBlur,
      color: element.props?.shadowColor || DEFAULT_CAPTION_PROPS.shadowColor,
    }),
    strokeWidth: element.props?.lineWidth || DEFAULT_CAPTION_PROPS.lineWidth,
  });

  // Assign metadata and custom controls
  caption.set("id", element.id);
  caption.set("zIndex", index);

  // Disable unwanted control points
  caption.controls.mt = disabledControl;
  caption.controls.mb = disabledControl;
  caption.controls.ml = disabledControl;
  caption.controls.mr = disabledControl;
  caption.controls.bl = disabledControl;
  caption.controls.br = disabledControl;
  caption.controls.tl = disabledControl;
  caption.controls.tr = disabledControl;
  caption.controls.mtr = disabledControl;

  canvas.add(caption);
  return caption;
};

/**
 * Add a video frame as an image and returns it as a canvas element.
 *
 * @param {Object} params - Parameters for creating the video element.
 * @param {CanvasElement} params.element - The canvas element configuration.
 * @param {FabricCanvas} params.canvas - The Fabric.js canvas instance.
 * @param {number} params.index - The z-index of the element.
 * @param {number} params.seekTime - The seek time for extracting the video frame.
 * @param {CanvasMetadata} params.canvasMetadata - Metadata about the canvas, including scale and dimensions.
 * @param {FrameEffect} [params.currentFrameEffect] - Optional frame effect to apply to the video.
 * @returns {Promise<Image | Group | undefined>} A Fabric.js image or group object for the video frame.
 */
export const addVideoElement = async ({
  element,
  index,
  canvas,
  snapTime,
  canvasMetadata,
  currentFrameEffect,
}: {
  element: CanvasElement;
  index: number;
  canvas: FabricCanvas;
  snapTime: number;
  canvasMetadata: CanvasMetadata;
  currentFrameEffect?: FrameEffect;
}) => {
  try {
    const thumbnailUrl = await getThumbnail(
      element?.props?.src || "",
      snapTime
    );
    if (!thumbnailUrl) {
      console.error("Failed to get thumbnail");
      return;
    }

    const img = await Image.fromURL(thumbnailUrl);
    img.set({
      originX: "center",
      originY: "center",
      objectFit: "cover",
      left: 0,
      top: 0,
      cornerColor: "white",
      cornerStrokeColor: "#2563eb",
      cornerSize: 14,
      transparentCorners: false,
      borderColor: "#2563eb",
      borderScaleFactor: 2,
      centeredScaling: true,
      centeredRotation: true,
      lockMovementX: false,
      lockMovementY: false,
      lockUniScaling: true,
      hasControls: false,
      hasBorders: true,
      hasRotatingPoint: true,
      touchAction: "all",
      renderOnAddRemove: false,
      stateful: false,
      selection: true,
    });

    if (element.frame) {
      return addMediaGroup({
        element,
        img,
        index,
        canvas,
        canvasMetadata,
        currentFrameEffect,
      });
    } else {
      canvas.add(img);
      return img;
    }
  } catch (error) {
    console.error("Error loading image:", error);
  }
};

/**
 * Add an image element into a Fabric.js image object and optionally groups it with a frame.
 * 
 * @param element - The image element containing properties like source and frame information.
 * @param index - The z-index for ordering the element on the canvas.
 * @param canvas - The Fabric.js canvas instance.
 * @param canvasMetadata - Metadata of the canvas, including dimensions and scale factors.
 * @returns A Fabric.js image object or a group with an image and frame.
 */
export const addImageElement = async ({
  element,
  index,
  canvas,
  canvasMetadata,
}: {
  element: CanvasElement;
  index: number;
  canvas: FabricCanvas;
  canvasMetadata: CanvasMetadata;
}) => {
  try {
    // Load the image from the provided source URL
    const img = await Image.fromURL(element.props.src || '');
    img.set({
      originX: "center",
      originY: "center",
      objectFit: "cover",
      left: 0,
      top: 0,
      cornerColor: "white",
      cornerStrokeColor: "#2563eb",
      cornerSize: 14,
      transparentCorners: false,
      borderColor: "#2563eb",
      borderScaleFactor: 2,
      centeredScaling: true,
      centeredRotation: true,
      lockMovementX: false,
      lockMovementY: false,
      lockUniScaling: true,
      hasControls: false,
      hasBorders: true,
      hasRotatingPoint: true,
      touchAction: "all",
      renderOnAddRemove: false,
      stateful: false,
      selection: true,
    });

    // Return the group if a frame is defined, otherwise return the image
    if (element.frame) {
      return addMediaGroup({
        element,
        img,
        index,
        canvas,
        canvasMetadata,
      });
    } else {
      canvas.add(img);
      return img;
    }
  } catch (error) {
    console.error("Error loading image:", error);
  }
};

/**
 * Add a Fabric.js group combining an image and its associated frame, 
 * applying styling, positioning, and scaling based on the given properties.
 *
 * @param element - The image element containing properties like frame, position, and styling.
 * @param img - The Fabric.js image object to be included in the group.
 * @param index - The z-index for ordering the group on the canvas.
 * @param canvasMetadata - Metadata of the canvas, including dimensions and scale factors.
 * @param currentFrameEffect - Optional current frame effect to override default frame properties.
 * @returns A Fabric.js group containing the image and frame with configured properties.
 */
export const addMediaGroup = ({
  element,
  img,
  index,
  canvas,
  canvasMetadata,
  currentFrameEffect,
}: {
  element: CanvasElement;
  img: Image;
  index: number;
  canvas: FabricCanvas;
  canvasMetadata: CanvasMetadata;
  currentFrameEffect?: FrameEffect;
}) => {
  if (element.frame) {
    // Canvas dimensions
    const maxWidth = canvasMetadata.width;
    const maxHeight = canvasMetadata.height;

    // Determine frame size, angle, and position based on frame effect or element properties
    let frameSize, angle, framePosition;
    if (currentFrameEffect) {
      frameSize = {
        width:
          (currentFrameEffect.props.frameSize?.[0] || 0) *
            canvasMetadata.scaleX || maxWidth,
        height:
          (currentFrameEffect.props.frameSize?.[1] || 0) *
            canvasMetadata.scaleY || maxHeight,
      };
      angle = currentFrameEffect.props.rotation || 0;
      framePosition = currentFrameEffect.props.framePosition;
    } else {
      frameSize = {
        width:
          (element.frame.size?.[0] || 0) * canvasMetadata.scaleX ||
          maxWidth,
        height:
          (element.frame.size?.[1] || 0) * canvasMetadata.scaleY ||
          maxHeight,
      };
      angle = element.frame.rotation || 0;
      framePosition = {
        x: element.frame.x || 0,
        y: element.frame.y || 0,
      };
    }

    // Adjust the image size to fit within the frame
    const newSize = getObjectFitSize(
      element.objectFit || "none",
      { width: img.width!, height: img.height! },
      frameSize
    );

    // Create a Fabric.js rectangle to represent the frame
    const frameRect = new Rect({
      width: frameSize.width,
      height: frameSize.height,
      left: frameSize.width / 2,
      top: frameSize.height / 2,
      fill: "transparent",
      stroke: element.frame.stroke || "#ffffff",
      strokeWidth: element.frame.lineWidth || 1,
      originX: "center",
      originY: "center",
      hasControls: true,
      hasBorders: true,
      lockUniScaling: true,
      hasRotatingPoint: true,
      selectable: true,
    });

    // Position and scale the image within the frame
    img.set({
      lockUniScaling: true,
      left:
        (element.props.pos?.x || 0) * canvasMetadata.scaleX +
        frameSize.width / 2,
      top:
        (element.props.pos?.y || 0) * canvasMetadata.scaleY +
        frameSize.height / 2,
      originX: "center",
      originY: "center",
      scaleX: newSize.width / img.width!,
      scaleY: newSize.height / img.height!,
    });

    // Convert frame position to canvas coordinates
    const { x, y } = convertToCanvasPosition(
      framePosition?.x || 0,
      framePosition?.y || 0,
      canvasMetadata
    );

    // Define group properties
    const groupProps = {
      left: x,
      top: y,
      width: frameSize.width,
      height: frameSize.height,
      angle: angle,
    };

    // Create a Fabric.js group containing the image and frame
    const group = new Group([img, frameRect], {
      left: groupProps.left,
      top: groupProps.top,
      originX: "center",
      originY: "center",
      width: frameSize.width,
      height: frameSize.height,
      clipPath: frameRect,
      angle: groupProps.angle,
      selectable: true,
      hasControls: true,
      hasBorders: true,
    });

    // Customize the control points for the group
    group.controls.mt = disabledControl; // Disable middle-top control
    group.controls.mb = disabledControl; // Disable middle-bottom control
    group.controls.ml = disabledControl; // Disable middle-left control
    group.controls.mr = disabledControl; // Disable middle-right control
    group.controls.mtr = rotateControl;  // Enable and style the rotation control

    // Set group metadata
    group.set("zIndex", index);
    group.set("id", element.id);

    canvas.add(group);
    return group;
  }
};

/**
 * Add a rectangular Fabric.js element based on the provided canvas element data.
 *
 * @param element - The canvas element containing properties for the rectangle.
 * @param index - The zIndex value used to determine the rendering order.
 * @param canvas - The Fabric.js canvas instance.
 * @param canvasMetadata - Metadata containing canvas scaling and dimensions.
 * @returns A Fabric.js Rect object configured with the specified properties.
 */
export const addRectElement = ({
  element,
  index,
  canvas,
  canvasMetadata,
}: {
  element: CanvasElement;
  index: number;
  canvas: FabricCanvas;
  canvasMetadata: CanvasMetadata;
}) => {
  // Convert element's position to canvas coordinates
  const { x, y } = convertToCanvasPosition(
    element.props?.x || 0,
    element.props?.y || 0,
    canvasMetadata
  );

  // Create a new rectangular Fabric.js object
  const rect = new Rect({
    left: x, // X-coordinate on the canvas
    top: y,  // Y-coordinate on the canvas
    originX: "center", // Center the rectangle based on its position
    originY: "center", // Center the rectangle based on its position
    angle: element.props?.rotation || 0, // Rotation angle
    rx: (element.props?.radius || 0) * canvasMetadata.scaleX, // Horizontal radius for rounded corners
    ry: (element.props?.radius || 0) * canvasMetadata.scaleY, // Vertical radius for rounded corners
    stroke: element.props?.stroke || "#000000", // Stroke color
    strokeWidth:
      (element.props?.lineWidth || 0) * canvasMetadata.scaleX, // Scaled stroke width
    fill: element.props?.fill || "#000000", // Fill color
    opacity: element.props?.opacity || 1, // Opacity level
    width: (element.props?.width || 0) * canvasMetadata.scaleX, // Scaled width
    height: (element.props?.height || 0) * canvasMetadata.scaleY, // Scaled height
  });

  // Set custom properties for the rectangle
  rect.set("id", element.id); // Unique identifier for the rectangle
  rect.set("zIndex", index); // zIndex determines rendering order

  // Set custom control for rotation
  rect.controls.mtr = rotateControl;

  canvas.add(rect);
  return rect;
};


/**
 * Add a background color to the canvas.
 *
 * @param element - The canvas element containing properties for the background.
 * @param index - The zIndex value used to determine the rendering order.
 * @param canvas - The Fabric.js canvas instance.
 * @param canvasMetadata - Metadata containing canvas scaling and dimensions. 
 * @returns A Fabric.js Rect object configured with the specified properties.
 */
export const addBackgroundColor = ({
  element,
  index,
  canvas,
  canvasMetadata,
}: {
  element: CanvasElement;
  index: number;
  canvas: FabricCanvas;
  canvasMetadata: CanvasMetadata;
}) => {
  const bgRect  = new Rect({
    width: canvasMetadata.width,
    height: canvasMetadata.height,
    left: canvasMetadata.width / 2,
    top: canvasMetadata.height / 2,
    fill: element.backgoundColor ?? "#000000",
    originX: "center",
    originY: "center",
    hasControls: false,
    hasBorders: false,
    selectable: false,
  });

  bgRect.controls.mt = disabledControl;
  bgRect.controls.mb = disabledControl;
  bgRect.controls.ml = disabledControl;
  bgRect.controls.mr = disabledControl;
  bgRect.controls.bl = disabledControl;
  bgRect.controls.br = disabledControl;
  bgRect.controls.tl = disabledControl;
  bgRect.controls.tr = disabledControl;
  bgRect.controls.mtr = disabledControl;
  bgRect.set("zIndex", index-0.5);

  canvas.add(bgRect);
  return bgRect;
}






