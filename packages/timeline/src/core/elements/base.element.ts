import { Animation } from "../../types";
import { generateShortUuid } from "../../utils/timeline.utils";
import type { ElementVisitor } from "../visitor/element-visitor";

export abstract class TrackElement {
  protected id: string;
  protected type: string;
  protected s!: number;
  protected e!: number;
  protected trackId!: string;
  protected name!: string;
  protected animation?: Animation;
  protected props: Record<string, any>;

  constructor(type: string, id?: string) {
    this.id = id ?? `e-${generateShortUuid()}`;
    this.type = type;
    this.props = {};
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

  getAnimation(): Animation | undefined {
    return this.animation;
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
    this.s = s;
    this.e = s + 1;
    return this;
  }

  setEnd(e: number) {
    this.e = e;
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

  setAnimation(animation?: Animation) {
    this.animation = animation;
    return this;
  }

  setProps(props: Record<string, any>) {
    this.props = props;
    return this;
  }

}