#!/usr/bin/env node
/**
 * Prints /resume to public/aditya-joshi-resume.pdf, the file behind every
 * "Download the resume" button.
 *
 * It renders the site's own /resume page with its print stylesheet, so the
 * PDF can only ever say what the page says. Run it whenever src/data/resume.ts,
 * experience.ts or stack.ts change:
 *
 *   npm run build && npm run start      (in one terminal)
 *   npm run resume:pdf                  (in another)
 *
 * Pass a base URL to print from somewhere else, e.g. a Vercel preview:
 *
 *   npm run resume:pdf -- https://preview-url.vercel.app
 *
 * Drives the local Chrome over the DevTools protocol rather than with
 * --print-to-pdf, because that flag waits for the network to go idle and the
 * analytics connections never let it. Set CHROME_PATH if Chrome lives
 * somewhere unusual. Needs Node 22+ for the built-in WebSocket.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const out = resolve(import.meta.dirname, "..", "public", "aditya-joshi-resume.pdf");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
]
  .filter(Boolean)
  .find((p) => existsSync(p));
if (!chrome) {
  console.error("No Chrome found. Set CHROME_PATH to a Chrome or Chromium binary.");
  process.exit(1);
}

// A throwaway profile, so the run never touches a real browser profile.
const profile = mkdtempSync(join(tmpdir(), "resume-pdf-"));
const browser = spawn(
  chrome,
  ["--headless=new", "--disable-gpu", "--no-first-run", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"],
  { stdio: "ignore" },
);

try {
  // Chrome writes the port it picked into the profile once it is listening.
  let port;
  for (let i = 0; i < 300 && !port; i++) {
    try {
      port = readFileSync(join(profile, "DevToolsActivePort"), "utf8").split("\n")[0];
    } catch {
      await sleep(100);
    }
  }
  if (!port) throw new Error("Chrome did not start its DevTools endpoint.");

  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = targets.find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r, j) => {
    ws.addEventListener("open", r, { once: true });
    ws.addEventListener("error", j, { once: true });
  });

  let id = 0;
  const pending = new Map();
  const events = new Map();
  ws.addEventListener("message", (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    } else if (msg.method && events.has(msg.method)) {
      events.get(msg.method)(msg.params);
    }
  });
  const send = (method, params = {}) =>
    new Promise((r) => {
      const i = ++id;
      pending.set(i, r);
      ws.send(JSON.stringify({ id: i, method, params }));
    });
  const once = (method) => new Promise((r) => events.set(method, r));

  await send("Page.enable");
  const loaded = once("Page.loadEventFired");
  await send("Page.navigate", { url: `${base}/resume` });
  await Promise.race([loaded, sleep(30_000)]);
  // Web fonts and late layout settle before printing.
  await send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => true)", awaitPromise: true });
  await sleep(500);

  const pdf = await send("Page.printToPDF", {
    preferCSSPageSize: true,
    printBackground: false,
    displayHeaderFooter: false,
  });
  if (!pdf.result?.data) throw new Error(`printToPDF failed: ${JSON.stringify(pdf.error ?? pdf)}`);
  const bytes = Buffer.from(pdf.result.data, "base64");
  writeFileSync(out, bytes);
  const pages = (bytes.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  console.log(`Wrote ${out} (${Math.round(bytes.length / 1024)} KB, ${pages} pages) from ${base}/resume`);
  ws.close();
} finally {
  browser.kill("SIGKILL");
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
}
