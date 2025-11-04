import { CAPTION_STYLE } from "@twick/timeline";

export const CAPTION_PROPS = {
    [CAPTION_STYLE.WORD_BG_HIGHLIGHT]: {
        font: {
            size: 50,
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
            size: 50,
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
            size: 50,
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
    }
  };