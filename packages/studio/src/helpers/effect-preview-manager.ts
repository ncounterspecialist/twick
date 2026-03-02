import { BASIC_VERTEX_SHADER, EFFECTS } from "@twick/effects";
import type { EffectKey } from "@twick/effects";

/**
 * Lightweight singleton that renders effect previews into a single hidden
 * WebGL canvas and returns data URLs for use in <img> tags.
 *
 * This avoids creating one WebGL context per effect card and stays within
 * browser context limits.
 */

let canvas: HTMLCanvasElement | null = null;
let gl: WebGLRenderingContext | null = null;

const PREVIEW_WIDTH = 160;
const PREVIEW_HEIGHT = 90;

const cache = new Map<EffectKey, string>();
const pending = new Map<EffectKey, Promise<string>>();

function ensureContext(): WebGLRenderingContext | null {
  if (typeof window === "undefined") return null;

  if (gl && canvas) {
    return gl;
  }

  canvas = document.createElement("canvas");
  canvas.width = PREVIEW_WIDTH;
  canvas.height = PREVIEW_HEIGHT;
  canvas.style.position = "absolute";
  canvas.style.left = "-9999px";
  canvas.style.top = "-9999px";
  canvas.style.width = `${PREVIEW_WIDTH}px`;
  canvas.style.height = `${PREVIEW_HEIGHT}px`;
  canvas.style.pointerEvents = "none";
  canvas.style.opacity = "0";

  document.body.appendChild(canvas);

  gl =
    (canvas.getContext("webgl", {
      preserveDrawingBuffer: true,
    }) as WebGLRenderingContext | null) ||
    (canvas.getContext("experimental-webgl", {
      preserveDrawingBuffer: true,
    }) as WebGLRenderingContext | null);

  if (!gl) {
    // Cleanup if WebGL is unavailable
    canvas.remove();
    canvas = null;
    return null;
  }

  return gl;
}

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const ok = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!ok) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

async function renderEffectToDataUrl(effectKey: EffectKey): Promise<string> {
  const glCtx = ensureContext();
  if (!glCtx || !canvas) {
    return "";
  }

  const effect = EFFECTS[effectKey];
  if (!effect) return "";

  const vertexShader = createShader(glCtx, glCtx.VERTEX_SHADER, BASIC_VERTEX_SHADER);
  const fragmentShader = createShader(glCtx, glCtx.FRAGMENT_SHADER, effect.fragment);
  if (!vertexShader || !fragmentShader) {
    return "";
  }

  const program = glCtx.createProgram();
  if (!program) {
    glCtx.deleteShader(vertexShader);
    glCtx.deleteShader(fragmentShader);
    return "";
  }

  glCtx.attachShader(program, vertexShader);
  glCtx.attachShader(program, fragmentShader);
  glCtx.linkProgram(program);

  const linked = glCtx.getProgramParameter(program, glCtx.LINK_STATUS);
  if (!linked) {
    glCtx.deleteProgram(program);
    glCtx.deleteShader(vertexShader);
    glCtx.deleteShader(fragmentShader);
    return "";
  }

  glCtx.useProgram(program);

  const positionLocation = glCtx.getAttribLocation(program, "a_position");
  const texCoordLocation = glCtx.getAttribLocation(program, "a_texCoord");

  const positionBuffer = glCtx.createBuffer();
  glCtx.bindBuffer(glCtx.ARRAY_BUFFER, positionBuffer);
  const positions = new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    -1, 1,
    1, -1,
    1, 1,
  ]);
  glCtx.bufferData(glCtx.ARRAY_BUFFER, positions, glCtx.STATIC_DRAW);

  glCtx.enableVertexAttribArray(positionLocation);
  glCtx.vertexAttribPointer(positionLocation, 2, glCtx.FLOAT, false, 0, 0);

  const texCoordBuffer = glCtx.createBuffer();
  glCtx.bindBuffer(glCtx.ARRAY_BUFFER, texCoordBuffer);
  const texCoords = new Float32Array([
    0, 0,
    1, 0,
    0, 1,
    0, 1,
    1, 0,
    1, 1,
  ]);
  glCtx.bufferData(glCtx.ARRAY_BUFFER, texCoords, glCtx.STATIC_DRAW);

  glCtx.enableVertexAttribArray(texCoordLocation);
  glCtx.vertexAttribPointer(texCoordLocation, 2, glCtx.FLOAT, false, 0, 0);

  const texture = glCtx.createTexture();
  glCtx.bindTexture(glCtx.TEXTURE_2D, texture);
  const size = 64;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const fx = x / (size - 1);
      const fy = y / (size - 1);
      data[i + 0] = fx * 255;
      data[i + 1] = fy * 255;
      data[i + 2] = 200;
      data[i + 3] = 255;
    }
  }
  glCtx.texImage2D(
    glCtx.TEXTURE_2D,
    0,
    glCtx.RGBA,
    size,
    size,
    0,
    glCtx.RGBA,
    glCtx.UNSIGNED_BYTE,
    data,
  );
  glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MIN_FILTER, glCtx.LINEAR);
  glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MAG_FILTER, glCtx.LINEAR);
  glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_S, glCtx.CLAMP_TO_EDGE);
  glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_T, glCtx.CLAMP_TO_EDGE);

  const textureLocation = glCtx.getUniformLocation(program, "uTexture");
  if (textureLocation) {
    glCtx.uniform1i(textureLocation, 0);
  }

  const timeLocation = glCtx.getUniformLocation(program, "uTime");
  if (timeLocation) {
    glCtx.uniform1f(timeLocation, 1.0);
  }

  const intensityLocation = glCtx.getUniformLocation(program, "uIntensity");
  if (intensityLocation) {
    glCtx.uniform1f(intensityLocation, 0.9);
  }

  const resolutionLocation = glCtx.getUniformLocation(program, "uResolution");
  if (resolutionLocation) {
    glCtx.uniform2f(resolutionLocation, canvas.width, canvas.height);
  }

  glCtx.viewport(0, 0, canvas.width, canvas.height);
  glCtx.clearColor(0, 0, 0, 1);
  glCtx.clear(glCtx.COLOR_BUFFER_BIT);
  glCtx.drawArrays(glCtx.TRIANGLES, 0, 6);

  const url = canvas.toDataURL("image/png");

  // Clean up per-render resources, keep context and canvas
  glCtx.deleteTexture(texture);
  glCtx.deleteBuffer(positionBuffer);
  glCtx.deleteBuffer(texCoordBuffer);
  glCtx.deleteProgram(program);
  glCtx.deleteShader(vertexShader);
  glCtx.deleteShader(fragmentShader);

  return url;
}

export function getEffectPreviewForEffect(
  effectKey: EffectKey,
): Promise<string> {
  if (cache.has(effectKey)) {
    return Promise.resolve(cache.get(effectKey) as string);
  }

  if (pending.has(effectKey)) {
    return pending.get(effectKey) as Promise<string>;
  }

  const promise = (async () => {
    const url = await renderEffectToDataUrl(effectKey);
    if (url) {
      cache.set(effectKey, url);
    }
    pending.delete(effectKey);
    return url;
  })();

  pending.set(effectKey, promise);
  return promise;
}

