// Type declarations for mp4-wasm
declare module 'mp4-wasm' {
  export default function loadMp4Module(options: { wasmBinary: ArrayBuffer }): Promise<any>;
}
