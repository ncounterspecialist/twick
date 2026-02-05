#!/usr/bin/env node
/**
 * Copy @ffmpeg/ffmpeg dist and patch worker.js so webpack/Next.js/CRA
 * don't try to resolve the dynamic import(coreURL) as a module.
 * Runs on prepare (after install) so dist/ exists for local dev and publish.
 */
const fs = require('fs');
const path = require('path');

const pkgRoot = path.resolve(__dirname, '..');
const distOut = path.join(pkgRoot, 'dist');

const possibleSrcRoots = [
  path.join(pkgRoot, 'node_modules', '@ffmpeg', 'ffmpeg'),
  path.join(pkgRoot, '..', '..', 'node_modules', '.pnpm', 'node_modules', '@ffmpeg', 'ffmpeg'),
  path.join(pkgRoot, '..', 'browser-render', 'node_modules', '@ffmpeg', 'ffmpeg'),
  path.join(pkgRoot, '..', '..', 'node_modules', '@ffmpeg', 'ffmpeg'),
];
let srcRoot = null;
for (const r of possibleSrcRoots) {
  if (fs.existsSync(path.join(r, 'dist'))) {
    srcRoot = r;
    break;
  }
}
if (!srcRoot) {
  console.warn('[@twick/ffmpeg-web] @ffmpeg/ffmpeg dist not found; run pnpm install first.');
  process.exit(0);
}

const distIn = path.join(srcRoot, 'dist');

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(distOut)) fs.rmSync(distOut, { recursive: true });
copyRecursive(distIn, distOut);

const workerPath = path.join(distOut, 'esm', 'worker.js');
if (fs.existsSync(workerPath)) {
  let content = fs.readFileSync(workerPath, 'utf8');
  const bothComments = '/* webpackIgnore: true */ /* @vite-ignore */';
  let patched = false;
  // Upstream may have @vite-ignore; replace with both so webpack and Vite are happy.
  if (content.includes('/* @vite-ignore */') && !content.includes(bothComments)) {
    content = content.replace('/* @vite-ignore */', bothComments);
    patched = true;
  }
  // Already-patched (webpack only): add @vite-ignore so Vite doesn't warn.
  if (content.includes('/* webpackIgnore: true */') && !content.includes('/* @vite-ignore */')) {
    content = content.replace('/* webpackIgnore: true */ _coreURL', bothComments + ' _coreURL');
    patched = true;
  }
  if (patched) {
    fs.writeFileSync(workerPath, content);
    console.log('[@twick/ffmpeg-web] Patched dist/esm/worker.js for webpack/Next.js/CRA/Vite.');
  }
}

// Patch classes.js: worker onerror, load timeout, main-thread fetch + blob URLs (COEP / Amplify)
const classesPath = path.join(distOut, 'esm', 'classes.js');
if (fs.existsSync(classesPath)) {
  let classesContent = fs.readFileSync(classesPath, 'utf8');

  // 1. Add worker onerror in #registerHandlers (reject pending promises, clear worker)
  const onmessageEnd = `                delete this.#resolves[id];
                delete this.#rejects[id];
            };
        }
    };`;
  const onmessageEndWithOnerror = `                delete this.#resolves[id];
                delete this.#rejects[id];
            };
            this.#worker.onerror = (ev) => {
                const err = new Error('FFmpeg worker error: ' + (ev.message || ev.filename || 'unknown'));
                const ids = Object.keys(this.#rejects);
                for (const id of ids) {
                    this.#rejects[id](err);
                    delete this.#rejects[id];
                    delete this.#resolves[id];
                }
                this.loaded = false;
                this.#worker = null;
            };
        }
    };`;
  if (classesContent.includes("this.#worker.onerror = (ev) =>") === false && classesContent.includes(onmessageEnd)) {
    classesContent = classesContent.replace(onmessageEnd, onmessageEndWithOnerror);
  }

  // 2. Replace load() with: preload on main thread (fetch + blob URLs), optional fetchOptions, load timeout
  const oldLoad = `    load = ({ classWorkerURL, ...config } = {}, { signal } = {}) => {
        if (!this.#worker) {
            this.#worker = classWorkerURL ?
                new Worker(new URL(classWorkerURL, import.meta.url), {
                    type: "module",
                }) :
                // We need to duplicated the code here to enable webpack
                // to bundle worekr.js here.
                new Worker(new URL("./worker.js", import.meta.url), {
                    type: "module",
                });
            this.#registerHandlers();
        }
        return this.#send({
            type: FFMessageType.LOAD,
            data: config,
        }, undefined, signal);
    };`;
  const newLoad = `    load = ({ classWorkerURL, ...config } = {}, { signal } = {}) => {
        if (!this.#worker) {
            this.#worker = classWorkerURL ?
                new Worker(new URL(classWorkerURL, import.meta.url), {
                    type: "module",
                }) :
                new Worker(new URL("./worker.js", import.meta.url), {
                    type: "module",
                });
            this.#registerHandlers();
        }
        const { fetchOptions: fetchOpts, preloadOnMainThread: preload, ...loadData } = config;
        let dataToSend = loadData;
        const run = async () => {
            if (preload !== false && loadData.coreURL) {
                const wasmURL = loadData.wasmURL || loadData.coreURL.replace(/.js$/g, ".wasm");
                const opts = { ...fetchOpts, signal };
                const [coreRes, wasmRes] = await Promise.all([
                    fetch(loadData.coreURL, opts),
                    fetch(wasmURL, opts),
                ]);
                if (!coreRes.ok || !wasmRes.ok) {
                    throw new Error("FFmpeg core/wasm fetch failed: " + coreRes.status + " " + wasmRes.status);
                }
                dataToSend = {
                    ...loadData,
                    coreURL: URL.createObjectURL(await coreRes.blob()),
                    wasmURL: URL.createObjectURL(await wasmRes.blob()),
                };
            }
            const loadPromise = this.#send({ type: FFMessageType.LOAD, data: dataToSend }, undefined, signal);
            const timeoutMs = 30000;
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("FFmpeg load timeout. If using COEP, ensure COOP/COEP and CORP headers allow worker and core scripts (check Network tab for blocked requests).")), timeoutMs);
            });
            return await Promise.race([loadPromise, timeoutPromise]);
        };
        return run().catch((err) => {
            if (err.message && err.message.startsWith("FFmpeg load timeout")) {
                this.terminate();
            }
            throw err;
        });
    };`;
  if (classesContent.includes(oldLoad)) {
    classesContent = classesContent.replace(oldLoad, newLoad);
  } else if (classesContent.includes("preloadOnMainThread") === false) {
    console.warn('[@twick/ffmpeg-web] classes.js load() pattern not found; skipping load patch.');
  }

  fs.writeFileSync(classesPath, classesContent);
  console.log('[@twick/ffmpeg-web] Patched dist/esm/classes.js (onerror, load timeout, main-thread fetch + blobs).');
}

// Patch types.d.ts: add fetchOptions and preloadOnMainThread to FFMessageLoadConfig
const typesPath = path.join(distOut, 'esm', 'types.d.ts');
if (fs.existsSync(typesPath)) {
  let typesContent = fs.readFileSync(typesPath, 'utf8');
  const loadConfigEnd = `    classWorkerURL?: string;
}`;
  const loadConfigWithExtras = `    classWorkerURL?: string;
    /**
     * Optional fetch options (e.g. headers) when preloading core/wasm on the main thread.
     * @see preloadOnMainThread
     */
    fetchOptions?: RequestInit;
    /**
     * If true (default when coreURL is set), fetch core and wasm on the main thread and pass blob URLs to the worker (avoids COEP blocking in worker context).
     * Set to false to use the original behavior (worker loads from URLs).
     */
    preloadOnMainThread?: boolean;
}`;
  if (typesContent.includes('preloadOnMainThread') === false && typesContent.includes(loadConfigEnd)) {
    typesContent = typesContent.replace(loadConfigEnd, loadConfigWithExtras);
    fs.writeFileSync(typesPath, typesContent);
    console.log('[@twick/ffmpeg-web] Patched dist/esm/types.d.ts (fetchOptions, preloadOnMainThread).');
  }
}

console.log('[@twick/ffmpeg-web] dist ready.');
