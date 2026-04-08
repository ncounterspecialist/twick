import { ImageElement } from "./image.element";
import type { ElementVisitor } from "../visitor/element-visitor";
import { TIMELINE_ELEMENT_TYPE } from "../../utils/constants";
import { EmojiProps, Size } from "../../types";

const DEFAULT_EMOJI_SIZE = 150;

export class EmojiElement extends ImageElement {
  protected declare props: EmojiProps;

  constructor(emoji: string, src: string, parentSize: Size) {
    super(src, parentSize);
    this.setType(TIMELINE_ELEMENT_TYPE.EMOJI);
    this.setObjectFit("contain");
    this.setFrame({
      x: 0,
      y: 0,
      size: [DEFAULT_EMOJI_SIZE, DEFAULT_EMOJI_SIZE],
    });
    this.props = {
      ...this.props,
      emoji,
    };
  }

  getEmoji(): string {
    return this.props.emoji ?? "";
  }

  setEmoji(emoji: string) {
    this.props.emoji = emoji;
    return this;
  }

  accept<T>(visitor: ElementVisitor<T>): T {
    return visitor.visitEmojiElement(this);
  }
}
