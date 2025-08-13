declare module "lamejs" {
  export class Mp3Encoder {
    constructor(channels: number, sampleRate: number, kbps: number);
    encodeBuffer(left: Int16Array, right?: Int16Array): Uint8Array;
    flush(): Uint8Array;
  }
  const lamejsDefault: {
    Mp3Encoder: typeof Mp3Encoder;
  };
  export default lamejsDefault;
}
