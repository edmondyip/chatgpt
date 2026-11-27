# SURV-008 · Glasswater 1.0 — Lagoon

Verified on 27 November 2026 using Chromium Headless Shell 151.0.7922.77 on a MacBook Pro with Apple M1 Max and 32 GB RAM. The browser used native ANGLE Metal.

- The static build embeds the approved standalone source byte-for-byte. At 1000 × 600 and the same simulation time and settings, the editable source produced a pixel-identical canvas image.
- Mouse hover, direct drag and reset passed at 1440 × 900. Touch disturbance, two-finger orbit, reset and the scrollable optics panel passed at 390 × 844 with browser touch emulation. Navigation controls stayed clear of the settings panel.
- Day, dusk and night presets, water depth, roughness and optics reset passed. The shadow and underwater-light switches changed rendered pixels at fixed simulation time. An overlapping, approaching pair of floats separated and reversed relative normal velocity through the existing update path. The embed example started at dusk and set depth from the parent.
- All seven site pages loaded without console errors at both viewport sizes. Home and products kept the direct experience links. The three categories resolved on the products page. Consent rejection, acceptance and withdrawal passed with tag requests intercepted. ReleaseProof retained its network isolation. All eight tests passed, Astro reported zero diagnostics, and the static build succeeded.
- The 1200 × 630 social card and 1600 × 900 hero are actual scene captures. The 26,648,735-byte showcase decoded all 1,800 frames. The export is 30.000 seconds, 1920 × 1080, 60 FPS, H.264, yuv420p with faststart. The export scales the original capped render size. [Capture instructions](surv-008/README.md)

## Performance observations

Five readings at the default daylight settings, after warm-up. Both viewports used the same Mac and browser.

| Render buffer | FPS readings | GPU scene |
| --- | --- | --- |
| 1440 × 900 | 120 | 6.6–6.7 ms |
| 390 × 844 with touch emulation | 119–120 | 4.2–5.2 ms |

The owner separately reported the readings below. Their browser and hardware are unspecified. The reported conditions differ across revisions.

| Revision | Render buffer | Owner-reported FPS | Owner-reported GPU scene |
| --- | --- | --- | --- |
| V13 | 1301 × 1238 | 65 | 12.0 ms |
| V14 | 1301 × 1238 | 94 | 7.6 ms |
| V15 | 910 × 1238 | 120 | 6.4 ms |

Physical phones, Safari, long-run thermal performance and live analytics ingestion remain unverified. WebGL 2 is required.
