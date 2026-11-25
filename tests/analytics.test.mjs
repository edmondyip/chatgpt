import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import assert from "node:assert/strict";
import test from "node:test";

test("the Google tag receives privacy settings before startup and suppresses its automatic page view", () => {
  const scripts = [];
  const frame = { window: {}, document: {
    createElement: () => ({}),
    head: { append: script => scripts.push(script) },
  } };
  runInNewContext(readFileSync(new URL("../public/analytics/frame.js", import.meta.url), "utf8"), frame);
  assert.equal(scripts.length, 0);
  frame.window.startAnalytics("/releaseproof/");
  const commands = frame.window.dataLayer.map(args => Array.from(args));
  assert.equal(commands[0][0], "set");
  const config = commands.find(args => args[0] === "config");
  assert.equal(config[1], "G-4ZJ8QXKEXV");
  assert.ok(commands.indexOf(config) < commands.findIndex(args => args[0] === "js"));
  assert.equal(config[2].send_page_view, false);
  assert.equal(config[2].allow_google_signals, false);
  assert.equal(config[2].allow_ad_personalization_signals, false);
  assert.equal(config[2].page_location, "https://chatgpt.256pages.com/releaseproof/");
  const consent = commands.find(args => args[0] === "consent")[2];
  for (const key of ["ad_storage", "ad_user_data", "ad_personalization"]) assert.equal(consent[key], "denied");
  assert.equal(scripts[0].src, "https://www.googletagmanager.com/gtag/js?id=G-4ZJ8QXKEXV");
});
