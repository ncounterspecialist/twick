import type { Plugin, ResolvedConfig } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

/**
 * Vite plugin that automatically copies browser-render assets from node_modules
 * to the project's public directory:
 * - public/ffmpeg/ffmpeg-core.js, ffmpeg-core.wasm (from @ffmpeg/core)
 * - public/mp4-wasm.wasm (from mp4-wasm or @twick/browser-render)
 * - public/audio-worker.js (from @twick/browser-render)
 *
 * Usage in vite.config.ts:
 * ```ts
 * import { twickBrowserRenderPlugin } from '@twick/browser-render/vite-plugin-ffmpeg';
 * export default defineConfig({ plugins: [twickBrowserRenderPlugin(), ...] });
 * ```
 */
export function twickBrowserRenderPlugin(): Plugin {
  let publicDir: string;
  let root: string;

  function copyIfNewer(src: string, dest: string): boolean {
    if (!fs.existsSync(src)) return false;
    if (!fs.existsSync(dest) || fs.statSync(src).mtime > fs.statSync(dest).mtime) {
      fs.copyFileSync(src, dest);
      return true;
    }
    return false;
  }

  return {
    name: 'twick-browser-render-ffmpeg',

    configResolved(config: ResolvedConfig) {
      root = config.root;
      publicDir = config.publicDir || path.join(root, 'public');
    },

    buildStart() {
      const copied: string[] = [];

      // 1. Copy FFmpeg core files to public/ffmpeg/
      const ffmpegCorePathBases = [
        path.join(root, 'node_modules', '@ffmpeg', 'core'),
        path.join(root, '..', '..', 'node_modules', '@ffmpeg', 'core'),
        path.join(root, '..', 'node_modules', '@ffmpeg', 'core'),
        path.join(root, '..', '..', '..', 'node_modules', '@ffmpeg', 'core'),
      ];
      const ffmpegCorePaths: string[] = [];
      for (const base of ffmpegCorePathBases) {
        ffmpegCorePaths.push(path.join(base, 'dist', 'esm')); // @ffmpeg/core 0.12+ uses dist/esm
        ffmpegCorePaths.push(path.join(base, 'dist'));
      }
      let ffmpegSource: string | null = null;
      for (const candidate of ffmpegCorePaths) {
        if (fs.existsSync(path.join(candidate, 'ffmpeg-core.js')) && fs.existsSync(path.join(candidate, 'ffmpeg-core.wasm'))) {
          ffmpegSource = candidate;
          break;
        }
      }
      // Resolve via plugin's package (browser-render depends on @ffmpeg/core — so it's available next to it or in pnpm store)
      if (!ffmpegSource) {
        const pluginDir = path.dirname(fileURLToPath(import.meta.url));
        const browserRenderRoot = path.dirname(pluginDir);
        const coreBases = [
          path.join(browserRenderRoot, '..', '@ffmpeg', 'core'),
          path.join(browserRenderRoot, '..', 'node_modules', '@ffmpeg', 'core'),
          path.join(browserRenderRoot, '..', '..', 'node_modules', '@ffmpeg', 'core'),
        ];
        for (const base of coreBases) {
          for (const sub of ['dist/esm', 'dist']) {
            const coreDist = path.join(base, sub);
            if (fs.existsSync(path.join(coreDist, 'ffmpeg-core.js')) && fs.existsSync(path.join(coreDist, 'ffmpeg-core.wasm'))) {
              ffmpegSource = coreDist;
              break;
            }
          }
          if (ffmpegSource) break;
        }
        // pnpm workspace: @ffmpeg/core lives in .pnpm store, not in workspace root node_modules
        if (!ffmpegSource && fs.existsSync(path.join(root, '..', '..', 'node_modules', '.pnpm'))) {
          const pnpmDir = path.join(root, '..', '..', 'node_modules', '.pnpm');
          const entries = fs.readdirSync(pnpmDir, { withFileTypes: true });
          for (const e of entries) {
            if (e.isDirectory() && e.name.startsWith('@ffmpeg+core@')) {
              const coreDist = path.join(pnpmDir, e.name, 'node_modules', '@ffmpeg', 'core', 'dist', 'esm');
              if (fs.existsSync(path.join(coreDist, 'ffmpeg-core.js')) && fs.existsSync(path.join(coreDist, 'ffmpeg-core.wasm'))) {
                ffmpegSource = coreDist;
                break;
              }
              const coreDistLegacy = path.join(pnpmDir, e.name, 'node_modules', '@ffmpeg', 'core', 'dist');
              if (fs.existsSync(path.join(coreDistLegacy, 'ffmpeg-core.js')) && fs.existsSync(path.join(coreDistLegacy, 'ffmpeg-core.wasm'))) {
                ffmpegSource = coreDistLegacy;
                break;
              }
            }
          }
        }
      }
      if (ffmpegSource) {
        const ffmpegDir = path.join(publicDir, 'ffmpeg');
        if (!fs.existsSync(ffmpegDir)) fs.mkdirSync(ffmpegDir, { recursive: true });
        if (copyIfNewer(path.join(ffmpegSource, 'ffmpeg-core.js'), path.join(ffmpegDir, 'ffmpeg-core.js'))) copied.push('ffmpeg-core.js');
        if (copyIfNewer(path.join(ffmpegSource, 'ffmpeg-core.wasm'), path.join(ffmpegDir, 'ffmpeg-core.wasm'))) copied.push('ffmpeg-core.wasm');
      } else {
        console.warn('[twick-browser-render] @ffmpeg/core not found; FFmpeg features may not work.');
      }

      // 2. Copy mp4-wasm.wasm to public/
      const mp4WasmCandidates = [
        path.join(root, 'node_modules', 'mp4-wasm', 'dist', 'mp4-wasm.wasm'),
        path.join(root, 'node_modules', 'mp4-wasm', 'build', 'mp4.wasm'),
        path.join(root, 'node_modules', '@twick', 'browser-render', 'public', 'mp4-wasm.wasm'),
        path.join(root, '..', 'node_modules', '@twick', 'browser-render', 'public', 'mp4-wasm.wasm'),
      ];
      const mp4Dest = path.join(publicDir, 'mp4-wasm.wasm');
      for (const src of mp4WasmCandidates) {
        if (copyIfNewer(src, mp4Dest)) {
          copied.push('mp4-wasm.wasm');
          break;
        }
      }

      // 3. Copy audio-worker.js from @twick/browser-render/public
      const audioWorkerCandidates = [
        path.join(root, 'node_modules', '@twick', 'browser-render', 'public', 'audio-worker.js'),
        path.join(root, '..', 'node_modules', '@twick', 'browser-render', 'public', 'audio-worker.js'),
      ];
      const audioDest = path.join(publicDir, 'audio-worker.js');
      for (const src of audioWorkerCandidates) {
        if (copyIfNewer(src, audioDest)) {
          copied.push('audio-worker.js');
          break;
        }
      }

      if (copied.length > 0) {
        console.log(`[twick-browser-render] Copied to public: ${copied.join(', ')}`);
      }
    },
  };
}
