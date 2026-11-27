# Cinematic Art Kit

[Glasswater 1.0 — Lagoon](https://chatgpt.256pages.com/glasswater/) is the public water study. The Moonseed Still is a completed local visual prototype on the SURV-006 branch. ChatGPT developed the experimental Glasswater studies from V1 to V15. Codex integrated the approved builds, organized the release source and verified the public experience. V5 established the public hover and drag controls. The owner accepted V15’s appearance, underwater illumination and interaction.

| Component | Existing capability | Integration boundary |
| --- | --- | --- |
| Water simulation | Glasswater advances fixed-step near and far height grids. Analytic swells, pointer stamps and strokes drive motion. The near grid accounts for float obstacles. | Keep simulation and sampling in world coordinates. A height field gives one surface elevation at each point. |
| Water rendering | WebGL 2 combines procedural sky, displaced sea, foam history, a projected seabed light map and four spheres. The visible pass caps resolution and can scale it down under load. | Keep shader programs, texture upload, offscreen passes, mesh and quality controls together. Align CPU swell sampling and shader displacement. |
| Lighting and materials | V15 includes day and night, exposure, optical controls, procedural seabed, refracted caustics and shadows, and underwater lamps. Moonseed uses Three.js materials, painted textures, fog, environment and authored lights. | Reuse Moonseed’s material helpers within Three.js. Keep lighting recipes with their renderers. |
| Camera and input | Glasswater separates hover from mouse drag and one-finger input from two-finger orbit. Moonseed uses OrbitControls with zoom and reset. | Retain each scene’s gesture mappings and camera limits. Pass picked positions in world space to the simulation. |
| Floating objects | Glasswater uses local surface height and slope for drift and vertical motion. Pairwise horizontal contacts separate overlapping spheres and apply impulses to approaching pairs. | Reuse the surface sampling and contact solver for similar props. Displaced-volume buoyancy and general rigid-body dynamics remain outside this implementation. |
| Procedural assets | Moonseed builds its workshop with primitives, lathed shapes, painted textures and animated apparatus. Stationary opaque meshes batch by finish. | Reuse factories inside Three.js groups. Leave animation targets independently addressable. |

The [standalone Glasswater package](prototypes/glasswater/lagoon/README.md) is MIT-licensed and includes the V15 HTML with the horizon correction, an annotated editable version, API documentation and an embed example. Use V15 to check visual and interaction parity. Keep the website and future commercial Art Kit components outside its licence scope.

For the next scene, start with the closest existing renderer. Extract a simulation or asset factory when a second scene needs it. Both prototypes require WebGL 2. Browser, hardware and scene settings affect performance. GPU scene time may be unavailable through the browser’s timer-query extension.

[Cinematic Skills](https://github.com/edmondyip/cinematic-skills) publishes six independent MIT-licensed skills based on the corrected Glasswater source. The library includes CPU reference modules, WebGL 2 integration guidance and a tide tank that combines the ocean, float physics and day/night modules. Three.js adapter guidance remains untested.

Public cinematic demos follow the [Experience UI Guidelines](EXPERIENCE_UI_GUIDELINES.md). Glasswater is the first to use the shared shell. Beneath the Surface will adopt it when released.
