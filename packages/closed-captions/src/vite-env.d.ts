/// <reference types="vite/client" />

declare module '*.mp4?url' {
  const src: string;
  export default src;
}

declare module '*.srt?url' {
  const src: string;
  export default src;
}

