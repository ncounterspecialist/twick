export interface ElementColors {
  fragment: string;
  video: string;
  caption: string;
  image: string;
  audio: string;
  text: string;
  element: string;
  rect: string;
  frameEffect: string;
  filters: string;
  transition: string;
  animation: string;
}

export const DEFAULT_ELEMENT_COLORS: ElementColors = {
  fragment: "#111111",
  video: "#4B2E83", // Muted deep violet (primary purple tone)
  caption: "#5C5470", // Faded violet/blue
  image: "#805A38", // Earthy brown-orange
  audio: "#3C665B", // Dark muted teal-green
  text: "#375A7F", // Dusty steel blue
  element: "#6B3A5B", // Muted berry purple
  rect: "#4C3A72", // Desaturated deep indigo
  frameEffect: "#703C57", // Dusty rose/maroon
  filters: "#5A4C82", // Muted twilight purple
  transition: "#7A573A", // Toasted copper
  animation: "#32645C", // Slate pine green
};



export const DEFAULT_TIMELINE_ZOOM = 1.5;

export const MIN_DURATION = 0.1;

export const DRAG_TYPE = {
  START: "start",
  MOVE: "move",
  END: "end",
};

export const PLAYER_STATE = {
  REFRESH: "Refresh",
  PLAYING: "Playing",
  PAUSED: "Paused",
};

export const CAPTION_STYLE = {
  WORD_BG_HIGHLIGHT: "highlight_bg",
  WORD_BY_WORD: "word_by_word",
  WORD_BY_WORD_WITH_BG: "word_by_word_with_bg",
};

export const CAPTION_STYLE_OPTIONS = {
  [CAPTION_STYLE.WORD_BG_HIGHLIGHT]: {
    label: "Highlight Background",
    value: CAPTION_STYLE.WORD_BG_HIGHLIGHT,
  },
  [CAPTION_STYLE.WORD_BY_WORD]: {
    label: "Word by Word",
    value: CAPTION_STYLE.WORD_BY_WORD,
  },
  [CAPTION_STYLE.WORD_BY_WORD_WITH_BG]: {
    label: "Word with Background",
    value: CAPTION_STYLE.WORD_BY_WORD_WITH_BG,
  },
};

export const CAPTION_FONT = {
  size: 40,
};

export const CAPTION_COLOR = {
  text: "#ffffff",
  highlight: "#ff4081",
  bgColor: "#8C52FF",
};

export const WORDS_PER_PHRASE = 4;

export const TIMELINE_OPERATION = {
  NONE: "NONE",
  ADD_NEW_TIMELINE: "ADD_NEW_TIMELINE",
  UPDATE_CAPTION_TIMELINE: "UPDATE_CAPTION_TIMELINE",
  ADD_ELEMENT: "ADD_ELEMENT",
  UPDATE_ELEMENT: "UPDATE_ELEMENT",
  DELETE_ITEM: "DELETE_ITEM",
  UPDATE_CAPTION_PROPS: "UPDATE_CAPTION_PROPS",
  ADD_SOLO_ELEMENT: "ADD_SOLO_ELEMENT",
  SPLIT_ELEMENT: "SPLIT_ELEMENT",
  LOAD_PROJECT: "LOAD_PROJECT",
  SET_PROJECT_SCRIPT: "SET_PROJECT_SCRIPT",
  FETCH_LATEST_PROJECT_DATA: "FETCH_LATEST_PROJECT_DATA",
  UPDATE_CANVAS_ELEMENTS: "updateCanvasElements",
};

export const TIMELINE_ACTION = {
  NONE: "none",
  SET_SEEK_TIME: "setSeekTime",
  SET_DURATION: "setDuration",
  RESET_HISTORY: "resetHistory",
  SET_PRESENT: "setPresent",
  SET_CURRENT_TIMELINE_PROPS: "setCurrentTimelineProps",
  SET_CAPTION_PROPS: "setCaptionProps",
  SET_SCREEN_ACTION: "setScreenAction",
  SET_PLAYER_STATE: "setPlayerState",
  SET_PROJECT_DATA: "setProjectData",
  UPDATE_PROJECT_DATA: "updateProjectData",
};

export const TIMELINE_ELEMENT_TYPE = {
  VIDEO: "video",
  CAPTION: "caption",
  IMAGE: "image",
  AUDIO: "audio",
  TEXT: "text",
  RECT: "rect",
};

export const PROCESS_STATE = {
  IDLE: "Idle",
  PROCESSING: "Processing",
  COMPLETED: "Completed",
  FAILED: "Failed",
};
