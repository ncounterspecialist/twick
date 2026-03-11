import { CAPTION_STYLE, computeCaptionGeometry } from "@twick/timeline";

const HIGHLIGHT_BG_FONT_SIZE = 46;
const WORD_BY_WORD_FONT_SIZE = 46;
const WORD_BY_WORD_WITH_BG_FONT_SIZE = 46;
const OUTLINE_ONLY_FONT_SIZE = 42;
const SOFT_BOX_FONT_SIZE = 40;

const HIGHLIGHT_BG_GEOMETRY = computeCaptionGeometry(HIGHLIGHT_BG_FONT_SIZE, CAPTION_STYLE.WORD_BG_HIGHLIGHT);
const WORD_BY_WORD_GEOMETRY = computeCaptionGeometry(WORD_BY_WORD_FONT_SIZE, CAPTION_STYLE.WORD_BY_WORD);
const WORD_BY_WORD_WITH_BG_GEOMETRY = computeCaptionGeometry(WORD_BY_WORD_WITH_BG_FONT_SIZE, CAPTION_STYLE.WORD_BY_WORD_WITH_BG);
const OUTLINE_ONLY_GEOMETRY = computeCaptionGeometry(OUTLINE_ONLY_FONT_SIZE, CAPTION_STYLE.OUTLINE_ONLY);
const SOFT_BOX_GEOMETRY = computeCaptionGeometry(SOFT_BOX_FONT_SIZE, CAPTION_STYLE.SOFT_BOX);

export const CAPTION_PROPS = {
    [CAPTION_STYLE.WORD_BG_HIGHLIGHT]: {
        font: {
            size: HIGHLIGHT_BG_FONT_SIZE,
            weight: 700,
            family: "Bangers",
        },
        colors: {
            text: "#ffffff",
            highlight: "#ff4081",
            bgColor: "#444444",
        },
        lineWidth: HIGHLIGHT_BG_GEOMETRY.lineWidth,
        rectProps: HIGHLIGHT_BG_GEOMETRY.rectProps,
        stroke: "#000000",
        fontWeight: 700,
        shadowOffset: [-1, 1],
        shadowColor: "#000000",
    },
    [CAPTION_STYLE.WORD_BY_WORD]: {
        font: {
            size: WORD_BY_WORD_FONT_SIZE,
            weight: 700,
            family: "Bangers",
        },
        colors: {
            text: "#ffffff",
            highlight: "#ff4081",
            bgColor: "#444444",
        },    
        lineWidth: WORD_BY_WORD_GEOMETRY.lineWidth,
        rectProps: WORD_BY_WORD_GEOMETRY.rectProps,
        stroke: "#000000",
        shadowOffset: [-1, 1],
        shadowColor: "#000000",
        shadowBlur: 5,
      },
    [CAPTION_STYLE.WORD_BY_WORD_WITH_BG]: {
        font: {
            size: WORD_BY_WORD_WITH_BG_FONT_SIZE,
            weight: 700,
            family: "Bangers",
        },
        colors: {
            text: "#ffffff",
            highlight: "#ff4081",
            bgColor: "#444444",
        },
        lineWidth: WORD_BY_WORD_WITH_BG_GEOMETRY.lineWidth,
        rectProps: WORD_BY_WORD_WITH_BG_GEOMETRY.rectProps,
        shadowOffset: [-1, 1],
        shadowColor: "#000000",
        shadowBlur: 5,
    },
    [CAPTION_STYLE.OUTLINE_ONLY]: {
        font: {
            size: OUTLINE_ONLY_FONT_SIZE,
            weight: 600,
            family: "Arial",
        },
        colors: {
            text: "#ffffff",
            highlight: "#ff4081",
            bgColor: "#000000",
        },
        lineWidth: OUTLINE_ONLY_GEOMETRY.lineWidth,
        rectProps: OUTLINE_ONLY_GEOMETRY.rectProps,
        stroke: "#000000",
        fontWeight: 600,
        shadowOffset: [0, 0],
        shadowColor: "#000000",
        shadowBlur: 0,
    },
    [CAPTION_STYLE.SOFT_BOX]: {
        font: {
            size: SOFT_BOX_FONT_SIZE,
            weight: 600,
            family: "Montserrat",
        },
        colors: {
            text: "#ffffff",
            highlight: "#ff4081",
            bgColor: "#333333",
        },
        lineWidth: SOFT_BOX_GEOMETRY.lineWidth,
        rectProps: SOFT_BOX_GEOMETRY.rectProps,
        stroke: "#000000",
        fontWeight: 600,
        shadowOffset: [-1, 1],
        shadowColor: "rgba(0,0,0,0.3)",
        shadowBlur: 3,
    },
  };