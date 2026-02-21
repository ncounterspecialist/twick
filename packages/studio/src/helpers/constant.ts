import { CAPTION_STYLE } from "@twick/timeline";

export const CAPTION_PROPS = {
    [CAPTION_STYLE.WORD_BG_HIGHLIGHT]: {
        font: {
            size: 46,
            weight: 700,
            family: "Bangers",
        },
        colors: {
            text: "#ffffff",
            highlight: "#ff4081",
            bgColor: "#444444",
        },
        lineWidth: 0.35,
        stroke: "#000000",
        fontWeight: 700,
        shadowOffset: [-3, 3],
        shadowColor: "#000000",
    },
    [CAPTION_STYLE.WORD_BY_WORD]: {
        font: {
            size: 46,
            weight: 700,
            family: "Bangers",
        },
        colors: {
            text: "#ffffff",
            highlight: "#ff4081",
            bgColor: "#444444",
        },    
        lineWidth: 0.35,
        stroke: "#000000",
        shadowOffset: [-2, 2],
        shadowColor: "#000000",
        shadowBlur: 5,
      },
    [CAPTION_STYLE.WORD_BY_WORD_WITH_BG]: {
        font: {
            size: 46,
            weight: 700,
            family: "Bangers",
        },
        colors: {
            text: "#ffffff",
            highlight: "#ff4081",
            bgColor: "#444444",
        },
        lineWidth: 0.35,
        shadowOffset: [-2, 2],
        shadowColor: "#000000",
        shadowBlur: 5,
    },
    [CAPTION_STYLE.OUTLINE_ONLY]: {
        font: {
            size: 42,
            weight: 600,
            family: "Arial",
        },
        colors: {
            text: "#ffffff",
            highlight: "#ff4081",
            bgColor: "#000000",
        },
        lineWidth: 0.5,
        stroke: "#000000",
        fontWeight: 600,
        shadowOffset: [0, 0],
        shadowColor: "#000000",
        shadowBlur: 0,
    },
    [CAPTION_STYLE.SOFT_BOX]: {
        font: {
            size: 40,
            weight: 600,
            family: "Montserrat",
        },
        colors: {
            text: "#ffffff",
            highlight: "#ff4081",
            bgColor: "#333333",
        },
        lineWidth: 0.2,
        stroke: "#000000",
        fontWeight: 600,
        shadowOffset: [-1, 1],
        shadowColor: "rgba(0,0,0,0.3)",
        shadowBlur: 3,
    },
  };