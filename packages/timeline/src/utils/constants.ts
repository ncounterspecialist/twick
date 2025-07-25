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

export const TIMELINE_ACTION = {
  NONE: "none",
  SET_SEEK_TIME: "setSeekTime",
  SET_DURATION: "setDuration",
  RESET_HISTORY: "resetHistory",
  SET_CURRENT_TIMELINE_PROPS: "setCurrentTimelineProps",
  SET_CAPTION_PROPS: "setCaptionProps",
  SET_SCREEN_ACTION: "setScreenAction",
  SET_PLAYER_STATE: "setPlayerState",
  SET_PROJECT_DATA: "setProjectData",
  UPDATE_PLAYER_DATA: "updatePlayerData",
  ON_PLAYER_UPDATED: "onPlayerUpdated",
  // Undo/Redo actions
  UNDO: "undo",
  REDO: "redo",
  SET_PRESENT: "setPresent",
};

export const TIMELINE_ELEMENT_TYPE = {
  VIDEO: "video",
  CAPTION: "caption",
  IMAGE: "image",
  AUDIO: "audio",
  TEXT: "text",
  RECT: "rect",
  CIRCLE: "circle",
  ICON: "icon",
};

export const PROCESS_STATE = {
  IDLE: "Idle",
  PROCESSING: "Processing",
  COMPLETED: "Completed",
  FAILED: "Failed",
}; 