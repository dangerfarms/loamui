// Screenshots of examples for the index cards, taken from the running docs
// server with headless Chrome over the DevTools protocol (no browser
// library needed). Each slug's own page is opened, the site's theme is
// pinned, and the stage frame alone is captured at 2x.
//
//   node scripts/shoot-previews.mjs <category>/<slug> [...more]
//   PREVIEW_THEME=light PREVIEW_ORIGIN=http://localhost:3007 node scripts/shoot-previews.mjs page-sections/hero-with-image
//
// Output: public/examples/previews/<slug>.webp
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = process.env.PREVIEW_ORIGIN ?? "http://localhost:3007";
const THEME = process.env.PREVIEW_THEME ?? "dark";
const CHROME =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const VIEWPORT = { width: 1400, height: 1000 };

const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.error("usage: node scripts/shoot-previews.mjs <category>/<slug> [...]");
  process.exit(1);
}

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
    "--hide-scrollbars",
    "--no-first-run",
    "--user-data-dir=/tmp/loamui-shoot-previews",
    "about:blank",
  ],
  { stdio: "ignore" },
);

async function waitForChrome() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await res.json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error("Chrome did not come up on the debugging port");
}

function connect(url) {
  const ws = new WebSocket(url);
  let id = 0;
  const pending = new Map();
  const listeners = new Map();
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method && listeners.has(msg.method)) {
      for (const fn of listeners.get(msg.method)) fn(msg.params);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const msgId = ++id;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  const once = (method) =>
    new Promise((resolve) => {
      const fns = listeners.get(method) ?? [];
      fns.push(function handler(params) {
        listeners.set(method, (listeners.get(method) ?? []).filter((f) => f !== handler));
        resolve(params);
      });
      listeners.set(method, fns);
    });
  const ready = new Promise((resolve) => ws.addEventListener("open", resolve));
  return { send, once, ready, close: () => ws.close() };
}

async function shoot(cdp, target) {
  const [category, slug] = target.split("/");
  if (!category || !slug) throw new Error(`expected <category>/<slug>, got "${target}"`);
  const loaded = cdp.once("Page.loadEventFired");
  await cdp.send("Page.navigate", { url: `${ORIGIN}/examples/${category}/${slug}` });
  await loaded;

  // Pin the theme the way the site's toggle does, then wait for the
  // frame's images to decode so the shot is not a row of empty boxes.
  const { result, exceptionDetails } = await cdp.send("Runtime.evaluate", {
    awaitPromise: true,
    returnByValue: true,
    expression: `(async () => {
      document.documentElement.dataset.theme = ${JSON.stringify(THEME)};
      // Next's dev overlay badge is fixed to the corner of every page.
      for (const portal of document.querySelectorAll("nextjs-portal")) portal.remove();
      // The stage carries data-width; its frame is the child right under it.
      const frame = document.querySelector('[data-width] > [class*="frame"]');
      if (!frame) throw new Error("no stage frame on the page");
      // The frame's own edge (outline, shadow, radius) belongs to the stage,
      // not the example: the card draws its own edge around the picture.
      frame.style.outline = "none";
      frame.style.boxShadow = "none";
      frame.style.borderRadius = "0";
      await Promise.all([...frame.querySelectorAll("img")].map((img) => img.decode().catch(() => {})));
      await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 300)));
      let r = frame.getBoundingClientRect();
      for (let i = 0; i < 20 && r.width === 0; i++) {
        await new Promise((res) => setTimeout(res, 100));
        r = frame.getBoundingClientRect();
      }
      if (r.width === 0) throw new Error("the frame never got a width");
      // A pixel in from each edge: a fractional rect lets the stage's
      // dotted ground bleed into the last row otherwise.
      return {
        x: Math.ceil(r.left + scrollX) + 1,
        y: Math.ceil(r.top + scrollY) + 1,
        width: Math.floor(r.width) - 2,
        height: Math.floor(r.height) - 2,
      };
    })()`,
  });
  if (exceptionDetails) {
    const text = exceptionDetails.exception?.description ?? exceptionDetails.text;
    throw new Error(`${target}: ${text}`);
  }
  const clip = { ...result.value, scale: 1 };
  const shot = await cdp.send("Page.captureScreenshot", {
    format: "webp",
    quality: 90,
    clip,
    captureBeyondViewport: true,
  });
  const dir = join(ROOT, "public", "examples", "previews");
  mkdirSync(dir, { recursive: true });
  const file = join(dir, `${slug}.webp`);
  writeFileSync(file, Buffer.from(shot.data, "base64"));
  console.log(`wrote ${file} (${Math.round(clip.width)}x${Math.round(clip.height)} css px @2x)`);
}

try {
  const cdp = connect(await waitForChrome());
  await cdp.ready;
  await cdp.send("Page.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    ...VIEWPORT,
    deviceScaleFactor: 2,
    mobile: false,
  });
  for (const target of targets) await shoot(cdp, target);
  cdp.close();
} finally {
  chrome.kill();
}
