/**
 * Default text properties for canvas text elements.
 * Provides consistent styling defaults for text elements added to the canvas.
 * 
 * @example
 * ```js
 * import { DEFAULT_TEXT_PROPS } from '@twick/canvas';
 * 
 * const textElement = {
 *   ...DEFAULT_TEXT_PROPS,
 *   text: "Hello World",
 *   x: 100,
 *   y: 100
 * };
 * ```
 */
export const DEFAULT_TEXT_PROPS = {
    /** Font family for text elements */
    family: "Poppins",
    /** Font size in pixels */
    size: 48,
    /** Text fill color */
    fill: "#FFFFFF",
    /** Text stroke color */
    stroke: "#000000",
    /** Stroke line width */
    lineWidth: 0,
  }
  
/**
 * Default caption properties for canvas caption elements.
 * Provides enhanced styling defaults specifically for caption elements
 * with background colors, shadows, and highlight options.
 * 
 * @example
 * ```js
 * import { DEFAULT_CAPTION_PROPS } from '@twick/canvas';
 * 
 * const captionElement = {
 *   ...DEFAULT_CAPTION_PROPS,
 *   text: "Video Caption",
 *   x: 50,
 *   y: 50
 * };
 * ```
 */
export const DEFAULT_CAPTION_PROPS = {
    /** Font family for caption elements */
    family: "Poppins",
    /** Font size in pixels */
    size: 48,
    /** Text fill color */
    fill: "#FFFFFF",
    /** Font weight */
    fontWeight: 600,
    /** Color configuration object */
    color: {
        /** Text color */
        text: "#FFFFFF",
        /** Background color */
        background: "#000000",
        /** Highlight color */
        highlight: "#FFFFFF",
    },
    /** Text stroke color */
    stroke: "#000000",
    /** Stroke line width */
    lineWidth: 0.2,
    /** Shadow color */
    shadowColor: "#000000",
    /** Shadow blur radius */
    shadowBlur: 2,
    /** Shadow offset [x, y] */
    shadowOffset: [0, 0],
}

/**
 * Canvas operation constants for tracking canvas state changes.
 * Defines the different types of operations that can occur on canvas elements.
 * 
 * @example
 * ```js
 * import { CANVAS_OPERATIONS } from '@twick/canvas';
 * 
 * function handleCanvasOperation(operation) {
 *   switch (operation) {
 *     case CANVAS_OPERATIONS.ITEM_ADDED:
 *       console.log('New item added to canvas');
 *       break;
 *     case CANVAS_OPERATIONS.ITEM_UPDATED:
 *       console.log('Item updated on canvas');
 *       break;
 *   }
 * }
 * ```
 */
export const CANVAS_OPERATIONS = {
  /** An item has been selected on the canvas */
  ITEM_SELECTED: "ITEM_SELECTED",
  /** An item has been updated/modified on the canvas */
  ITEM_UPDATED: "ITEM_UPDATED",
  /** An item has been deleted from the canvas */
  ITEM_DELETED: "ITEM_DELETED",
  /** A new item has been added to the canvas */
  ITEM_ADDED: "ITEM_ADDED",
  /** Items have been grouped together */
  ITEM_GROUPED: "ITEM_GROUPED",
  /** Items have been ungrouped */
  ITEM_UNGROUPED: "ITEM_UNGROUPED",
  /** Caption properties have been updated */
  CAPTION_PROPS_UPDATED: "CAPTION_PROPS_UPDATED",
  /** Watermark has been updated */
  WATERMARK_UPDATED: "WATERMARK_UPDATED",
  /** A new element was added via drop on canvas; payload is { element } */
  ADDED_NEW_ELEMENT: "ADDED_NEW_ELEMENT",
}

/**
 * Element type constants for canvas elements.
 * Defines the different types of elements that can be added to the canvas.
 * 
 * @example
 * ```js
 * import { ELEMENT_TYPES } from '@twick/canvas';
 * 
 * if (element.type === ELEMENT_TYPES.TEXT) {
 *   // Handle text element
 * } else if (element.type === ELEMENT_TYPES.IMAGE) {
 *   // Handle image element
 * }
 * ```
 */
export const ELEMENT_TYPES = {
  /** Text element type */
  TEXT: "text",
  /** Caption element type */
  CAPTION: "caption",
  /** Image element type */
  IMAGE: "image",
  /** Video element type */
  VIDEO: "video",
  /** Rectangle element type */
  RECT: "rect",
  /** Circle element type */
  CIRCLE: "circle",
  /** Icon element type */
  ICON: "icon",
  /** Background color element type */
  BACKGROUND_COLOR: "backgroundColor",
}
