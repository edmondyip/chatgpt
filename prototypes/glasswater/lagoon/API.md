# Configuration and API

The editable scene uses the DOM controls in `index.html`. Keep their IDs when editing the markup. An iframe offers an independent scene and input surface. Programmatic access requires the parent and iframe to share an origin. The existing V15 hooks live on the frame's `window` under the names below.

| Hook | Parameters and behavior |
| --- | --- |
| `artKitLight(hour, exposure?, lamps?)` | Local scene hour from 0–24. Exposure from −1.5 to +1.5 EV. Pass a boolean to enable the floating lamps after dark. Omitted values retain their current settings. Use finite numbers. |
| `artKitOptics(options)` | Apply any subset of the numeric options below and update the corresponding controls. Finite values clamp to their bounds. |
| `artKitState()` | Read camera yaw/pitch in degrees, frame time in milliseconds, quality scale, lighting, optics, caustic update count, wave clock, ripple statistics and four float positions in world-space `[x,y,z]`. GPU timing values can be null. Calling this hook reads and clears WebGL's current error flag. |
| `artKitPick(clientX, clientY)` | Intersect a viewport point in CSS pixels with the flat reference water plane. Returns `[x,z]` in scene metres or null when the ray misses the supported region. |
| `artKitProject(x, z)` | Map a water-plane point to viewport CSS pixels. Callers should choose points in front of the camera. |

| Optics option | Range | Default |
| --- | --- | --- |
| `wind` | 0–2× | 1× |
| `direction` | −180° to +180° | 0° |
| `wave` | 0–2× | 1× |
| `rough` | 0.02–0.22 | 0.065 |
| `depth` | 0.76–4 m | 1.60 m |
| `clarity` | 0–1 | 0.65 |
| `light` | 0–2× | 1× |
| `force` | 0.2–2.5× | 1× |

Use the labelled checkboxes for seabed caustics, refracted seabed shadows and underwater illumination. In a same-origin integration, set the corresponding input's `checked` property. The renderer reads these values in its lighting passes. The three IDs are `caustics`, `bedShadows` and `underwaterLights`.

## Same-origin example

Load the scene before configuring it. Use a separately served instance to preserve your host page’s styles and controls.

```js
const frame = document.querySelector("iframe");
frame.addEventListener("load", () => {
  frame.contentWindow.artKitLight(17.4, 0.2);
  frame.contentWindow.artKitOptics({ depth: 2.4, clarity: 0.8 });
});
frame.src = "./glasswater/index.html";
```

For a view-only embed, point an iframe at [the live demo](https://chatgpt.256pages.com/glasswater/) and give it a title and explicit dimensions. Browser same-origin rules govern access to the API. Open the approved standalone HTML alongside a changed build when checking camera framing, controls or rendering behavior.
