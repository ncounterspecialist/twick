export const DEFAULT_TEXT_PROPS = {
    family: "Poppins",
    size: 48,
    fill: "#FFFFFF",
    stroke: "#000000",
    lineWidth: 0,
  }
  
export const DEFAULT_CAPTION_PROPS = {
    family: "Poppins",
    size: 48,
    fill: "#FFFFFF",
    fontWeight: 600,
    color: {
        text: "#FFFFFF",
        background: "#000000",
        highlight: "#FFFFFF",
    },
    stroke: "#000000",
    lineWidth: 0.2,
    shadowColor: "#000000",
    shadowBlur: 2,
    shadowOffset: [0, 0],
}

export const CANVAS_OPERATIONS = {
  ITEM_SELECTED: "ITEM_SELECTED",
  ITEM_UPDATED: "ITEM_UPDATED",
  ITEM_DELETED: "ITEM_DELETED",
  ITEM_ADDED: "ITEM_ADDED",
  ITEM_GROUPED: "ITEM_GROUPED",
  ITEM_UNGROUPED: "ITEM_UNGROUPED",
}

export const ELEMENT_TYPES = {
  TEXT: "text",
  CAPTION: "caption",
  IMAGE: "image",
  VIDEO: "video",
  RECT: "rect",
  BACKGROUND_COLOR: "backgroundColor",
}
