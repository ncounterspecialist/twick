import { ImageProps, Position, TextProps, WatermarkJSON } from "../../types";

class Watermark {
  private id: string;
  private type: 'text' | 'image';
  private position?: Position;
  private rotation?: number;
  private opacity?: number;
  private props?: TextProps | ImageProps;

  constructor(type: 'text' | 'image') {
    this.type = type;
    this.id = 'e-watermark';
  }

  getId() {
    return this.id;
  }

  getType() {
    return this.type;
  }

  getPosition() {
    return this.position;
  }

  getRotation() {
    return this.rotation;
  }

  getOpacity() {
    return this.opacity;
  }

  getProps() {
    if (this.type === 'text') {
      return this.props as TextProps;
    } else if (this.type === 'image') {
      return this.props as ImageProps;
    }
  }

  setProps(props: TextProps | ImageProps) {
    if (this.type === 'text') {
      this.props = props as TextProps;
    } else if (this.type === 'image') {
      this.props = props as ImageProps;
    }
    return this;
  }

  setPosition(position: Position) {
    this.position = position;
    return this;
  }

  setRotation(rotation: number) {
    this.rotation = rotation;
    return this;
  }

  setOpacity(opacity: number) {
    this.opacity = opacity;
    return this;
  }

  toJSON(): WatermarkJSON {
    return {
      id: 'e-watermark',
      type: this.type,
      position: this.position,
      rotation: this.rotation,
      opacity: this.opacity,
      props: this.props as TextProps | ImageProps,
    };
  }

  static fromJSON(json: WatermarkJSON) {
    const watermark = new Watermark(json.type);
    watermark.setPosition(json.position ?? { x: 0, y: 0 });
    watermark.setRotation(json.rotation ?? 0);
    watermark.setOpacity(json.opacity ?? 1);
    watermark.setProps(json.props as TextProps | ImageProps);
    return watermark;
  }
}

export default Watermark;