# Cinematic Art Kit

Glasswater — Solstice is the first public showcase. The Moonseed Still is a completed local visual prototype on the SURV-006 branch. The kit is in development.

| Component | Existing capability | Integration boundary |
| --- | --- | --- |
| Water simulation | Glasswater’s makeWater advances damped, fixed-step near and far height grids. It accepts stamps and strokes, samples height and encodes displacement into textures. | Keep simulation in world coordinates with elapsed seconds as input. A height field represents one surface height per point. Breaking waves and volumetric flow are outside its scope. |
| Water rendering | WebGL 2 draws a sky, a graded ocean mesh with analytic swells, and four spheres. Shaders approximate sunlight and reflections. Render resolution scales down under load. | Keep shader programs, texture upload, mesh and quality control together. CPU swell sampling must stay aligned with shader displacement. |
| Lighting and materials | Glasswater shades its water and spheres directly. Moonseed uses Three.js materials, painted canvas textures, an environment map, fog and authored lights. | Keep each scene’s lighting recipe with its renderer. Reuse Moonseed’s material and painting helpers within Three.js scenes. |
| Camera and input | Glasswater projects pointer positions onto the water plane, separates hover from drag, and supports two-finger orbit. Moonseed uses OrbitControls with zoom and reset. | Retain scene-specific gesture mappings and camera limits. Pass picked world positions to the simulation. |
| Floating objects | Glasswater samples height and slope to drive damped vertical motion and horizontal drift around four anchor positions. | Reuse height sampling for surface-following props. This approximation provides neither rigid-body collisions nor displaced-volume buoyancy. |
| Procedural assets | Moonseed builds its workshop with grouped primitives, lathed shapes, generated textures and animated apparatus. Stationary opaque meshes are batched by finish. | Reuse asset factories and materials inside a Three.js group. Leave animation targets independently addressable. |

For the next scene, begin with the closest existing renderer. Extract a simulation or asset factory when a second scene uses it. Keep the approved standalone Glasswater file as the visual and interaction reference. Compare any extraction against its initial framing, hover response, camera bounds and float motion. Both prototypes require WebGL 2. Device performance and cross-renderer material equivalence need separate validation.
