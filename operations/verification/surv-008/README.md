# Reproduce the Glasswater showcase

Run on macOS from the repository root with Node, Chromium, `puppeteer-core` and FFmpeg with libx264 available. The capture script uses the byte-for-byte V15 baseline. Its camera hook and fixed clock exist only in the browser used for capture.

```sh
PUPPETEER_MODULE=/path/to/puppeteer-core CHROME_BIN=/path/to/chromium \
  node operations/verification/surv-008/capture.cjs /path/to/glasswater-showcase.mp4
```

The script renders 1,800 frames. It starts with a night view, cuts to midday, sweeps waves through the floats, moves through sunset and returns to night for the title. The native capture uses ANGLE Metal. Set `SOFTWARE_GL=1` for SwiftShader, or `CAPTURE_SECONDS=1` for a short test. The built-in render cap remains active. FFmpeg scales to 1920 × 1080 for the export.

```sh
ffprobe -v error -select_streams v:0 -show_streams -show_format glasswater-showcase.mp4
ffmpeg -v error -xerror -i glasswater-showcase.mp4 -f null -
```
