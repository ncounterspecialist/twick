import { generateShortUuid } from "../../utils/timeline.utils";
import type { ElementVisitor } from "../visitor/element-visitor";
import { ElementAnimation } from "../addOns/animation";
import { Position } from "../../types";

export abstract class TrackElement {
  protected id: string;
  protected type: string;
  protected s!: number;
  protected e!: number;
  protected trackId!: string;
  protected name!: string;
  protected animation?: ElementAnimation;
  protected props: Record<string, any>;

  constructor(type: string, id?: string) {
    this.id = id ?? `e-${generateShortUuid()}`;
    this.type = type;
    this.props = {
      x: 0,
      y: 0,
      opacity: 1,
      rotation: 0
    };
  }

  abstract accept<T>(visitor: ElementVisitor<T>): T;

  getId(): string {
    return this.id;
  }

  getType(): string {
    return this.type;
  }

  getStart(): number {
    return this.s;
  }

  getEnd(): number {
    return this.e;
  }

  getDuration(): number {
    return this.e - this.s;
  }

  getTrackId(): string {
    return this.trackId;
  }

  getProps(): Record<string, any> {
    return this.props;
  }

  getName(): string {
    return this.name;
  }

  getAnimation(): ElementAnimation | undefined {
    return this.animation;
  }

  getPosition(): Position {
    return {
      x: this.props?.x ?? 0,
      y: this.props?.y ?? 0
    };
  }

  getRotation(): number {
    return this.props.rotation ?? 0;
  }

  getOpacity(): number {
    return this.props.opacity ?? 1;
  }

  setId(id: string) {
    this.id = id;
    return this;
  }

  setType(type: string) {
    this.type = type;
    return this;
  }

  setStart(s: number) {
    this.s = Math.max(0, s);
    return this;
  }

  setEnd(e: number) {
    this.e = Math.max(this.s ?? 0, e);
    return this;
  }

  setTrackId(trackId: string) {
    this.trackId = trackId;
    return this;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setAnimation(animation?: ElementAnimation) {
    this.animation = animation;
    return this;
  }

  setPosition(position: Position) {
    this.props.x = position.x;
    this.props.y = position.y;
    return this;
  }

  setRotation(rotation: number) { 
    this.props.rotation = rotation;
    return this;
  }

  setOpacity(opacity: number) {
    this.props.opacity = opacity;
    return this;
  }

  setProps(props: Record<string, any>) {
    this.props = structuredClone(props);
    return this;
  }
}
