const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { once } = require("node:events");
const puppeteer = require(process.env.PUPPETEER_MODULE);

const source = path.join(__dirname, "../../../prototypes/glasswater/lagoon/Glasswater-v15.html");
const output = path.resolve(process.argv[2] || "glasswater-showcase.mp4");
const seconds = Number(process.env.CAPTURE_SECONDS ?? 30);
const fps = 60;

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_BIN,
    args: process.env.SOFTWARE_GL === "1"
      ? ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"]
      : ["--use-gl=angle", "--use-angle=metal", "--disable-software-rasterizer"],
  });
  let encoder;
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.evaluate(() => {
      window.captureClock = 0;
      performance.now = () => window.captureClock;
      window.requestAnimationFrame = (callback) => {
        window.captureNext = callback;
        return 1;
      };
    });
    const marker = "requestAnimationFrame(render);\n}catch";
    const approved = readFileSync(source, "utf8");
    assert.ok(approved.includes(marker));
    await page.setContent(approved.replace(marker,
      "window.captureCamera = (azimuth, elevation) => { yaw = azimuth; pitch = elevation; };\n" + marker));
    await page.addStyleTag({ content: "header, footer, aside, #err {visibility:hidden}" });
    const renderer = await page.evaluate(() => {
      if (!window.artKitState) throw Error(document.querySelector("#err").textContent);
      const context = document.querySelector("canvas").getContext("webgl2");
      const info = context.getExtension("WEBGL_debug_renderer_info");
      return info ? context.getParameter(info.UNMASKED_RENDERER_WEBGL) : "WebGL 2";
    });
    console.log(renderer);

    encoder = spawn("ffmpeg", [
      "-hide_banner", "-loglevel", "warning", "-y", "-f", "image2pipe", "-framerate", String(fps),
      "-vcodec", "mjpeg", "-i", "pipe:0", "-vf", "scale=1920:1080:flags=lanczos:in_range=full:out_range=tv,setsar=1", "-an", "-c:v", "libx264", "-preset", "fast",
      "-crf", "19", "-maxrate", "7M", "-bufsize", "10M", "-pix_fmt", "yuv420p", "-color_range", "tv", "-movflags", "+faststart", output,
    ], { stdio: ["pipe", "inherit", "inherit"] });
    const encoded = once(encoder, "close");
    encoder.stdin.on("error", (error) => errors.push(error.message));
    for (let frame = 0; frame < seconds * fps; ++frame) {
      const jpeg = await page.evaluate((frame) => {
        const t = frame / 60;
        const smooth = (a, b) => {
          const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
          return x * x * (3 - 2 * x);
        };
        const canvas = document.querySelector("canvas");
        if (t < 2.5) {
          window.artKitLight(22, .65);
          window.captureCamera(-14 + 9 * smooth(0, 2.5), 10 - 4 * smooth(0, 2.5));
        } else {
          const hour = 12 + 5.4 * smooth(11, 17.5) + 4.6 * smooth(19, 24);
          window.artKitLight(hour, .2 * smooth(11, 17.5) + .38 * smooth(19, 24));
          window.captureCamera(13 - 26 * smooth(2.5, 12) + 19 * smooth(13, 26), 5 - 8 * smooth(11, 18) + 12 * smooth(20, 28));
        }
        window.captureClock = (frame + 1) * 1000 / 60;
        for (const [start, end, z] of [[5, 7, 1.1], [8, 9.6, -.35], [17.4, 19, .8], [23, 24.8, 1.3]]) {
          if (t >= start && t < end) {
            const f = smooth(start, end);
            const [clientX, clientY] = window.artKitProject(-3.8 + 7.6 * f, z + .6 * Math.sin(f * 6.28));
            canvas.dispatchEvent(new PointerEvent("pointermove", { clientX, clientY, pointerType: "mouse", pointerId: 1 }));
          }
        }
        window.captureNext(window.captureClock);
        if (t < 26) return canvas.toDataURL("image/jpeg", .96).split(",")[1];

        const title = window.captureTitle ??= document.createElement("canvas");
        title.width = canvas.width;
        title.height = canvas.height;
        const ctx = title.getContext("2d");
        ctx.drawImage(canvas, 0, 0, title.width, title.height);
        ctx.globalAlpha = smooth(26, 26.8);
        ctx.fillStyle = "#020a13";
        ctx.globalAlpha *= .32;
        ctx.fillRect(0, 0, title.width, title.height);
        ctx.globalAlpha = smooth(26.15, 27.05);
        ctx.fillStyle = "#fff8e5";
        ctx.textAlign = "center";
        ctx.scale(title.width / 1920, title.height / 1080);
        ctx.font = "86px Georgia";
        ctx.letterSpacing = "8px";
        ctx.fillText("GLASSWATER", 960, 550);
        ctx.font = "30px system-ui";
        ctx.letterSpacing = ".5px";
        ctx.fillText("An interactive ocean, built entirely in code.", 960, 615);
        return title.toDataURL("image/jpeg", .96).split(",")[1];
      }, frame);
      assert.deepEqual(errors, []);
      if (!encoder.stdin.write(Buffer.from(jpeg, "base64"))) await once(encoder.stdin, "drain");
      if ((frame + 1) % 300 === 0) console.log(`Rendered ${(frame + 1) / fps} s`);
    }
    encoder.stdin.end();
    const [exitCode] = await encoded;
    assert.equal(exitCode, 0);
  } finally {
    encoder?.stdin.destroy();
    await browser.close();
  }
}

capture().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
