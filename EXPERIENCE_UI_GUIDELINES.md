# Cinematic experience UI

All public cinematic experiences use the shared shell and follow these release checks. Glasswater is the first example. Use the same shell for Beneath the Surface when it ships.

## Layout and configuration

- Register each public experience in [experiences.ts](src/lib/experiences.ts) with its stable ID, title, description, trailing-slash route, preview and share images, source repository, skill identifiers and browser requirements. The neutral palette is the default. An optional accent can tint the primary action and focus ring. Use the same record in the gallery and release route.
- Wrap the renderer in [ExperienceShell.astro](src/layouts/ExperienceShell.astro) and pass the typed experience record. Give an embedded frame a descriptive title and associate its browser requirements with the frame. The toolbar is the first grid row. The renderer fills the remaining row using the actual viewport height. Keep the root page free of scroll and keep the toolbar above the renderer in the document flow at every width.
- The toolbar carries Gallery, the current source repository, Support when available, and Get Skills. The [shared panel](src/components/ExperienceSkillsPanel.astro) uses the experience title and the configured skill links, along with [the shared copy control](src/components/SkillsInstallCommand.astro) and [analytics preferences](src/components/AnalyticsConsent.astro). It opens on demand as a modal with native Escape dismissal and focus return. Use the existing consent-gated event names for successful copies and outbound repository clicks. A copy records a clipboard action only.

## Typography, color and icons

- Use Georgia with a serif fallback for scene and panel titles. Use system UI sans-serif for controls, hints and preferences. Keep diagnostics compact with tabular numerals.
- The shell defines `--experience-ink` (#f5f1e8), `--experience-panel` (#172228f7), `--line` (#aebbc258) and `--experience-accent` (#e6e2d8 by default). Use subtle one-pixel borders and a single accent action. Keep panel fills sufficiently opaque for text contrast and avoid gradients or ornament in the UI.
- Use the [official GitHub mark](public/icons/github.svg) from [Primer Octicons](https://github.com/primer/octicons/blob/main/icons/mark-github-24.svg) with its [license](public/icons/octicons-LICENSE.txt). Use simple 24-unit line icons with 1.5-unit strokes elsewhere. Hide decorative SVGs from assistive technology and give icon controls names and tooltips. Store assets locally.

## Renderer ownership

The shell owns site navigation, repository links, skills discovery and support. The renderer owns the scene title, camera, simulation, gestures, water controls and diagnostic values. Keep shell analytics and site links outside the rendering document. Use a shared layout contract in future renderers without sending cross-frame messages.

- Put the title and interaction hint together at the top start. Put settings at the top end on wider screens. On narrow screens, place settings below the title and above the footer, with its own scroll area. Use grid tracks or other measured layout so title wrapping and settings expansion cannot collide.
- Put FPS diagnostics at the footer start and Reset at the footer end. Reserve room for multiple lines of diagnostics. Keep the footer and settings in separate tracks. Avoid fixed offsets based on an assumed diagnostic length.
- Keep decorative overlays pointer-transparent, and expose the interactive controls as keyboard-focusable elements. Shell actions have a 44 px minimum target. New renderer controls should meet the same target size. Preserve pointer and multi-touch gestures in the remaining canvas.
- Glasswater keeps its approved standalone source byte-for-byte. Its release route supplies [embed-only CSS](src/styles/glasswater-embedded.css) to lay out the legacy scene chrome. New renderers should own this layout in their source.
- Presentation mode, when supported by the renderer, hides scene title, hints, settings, diagnostics and Reset while leaving artwork and camera input running. Keep a keyboard route back to the controls. Use standalone or capture-only tooling to omit site navigation from promotional footage. The public shell needs no capture controls.

## Accessibility and release checks

- Use native buttons and links, visible focus rings, meaningful accessible names, and a named modal. Verify keyboard opening, tab order, Escape and focus return. Panel content must scroll on short screens. Test the clipboard confirmation and blocked-write fallback. The install command remains selectable.
- Verify at 1920 × 1080, 1440 × 900, 1024 × 768, 800 × 500, 600 × 400, 844 × 390 landscape touch, 390 × 844 and 320 × 568. Resize a running desktop scene through the compact breakpoint. Check toolbar and canvas bounds, title and hint wrapping, settings expanded, FPS text, Reset and modal scroll. Sample mouse and touch interactions behind the closed modal.
- Confirm skills, source, gallery and supporter destinations. Confirm analytics consent and withdrawal, including successful copy and outbound events. Verify unsupported browser requirements are accurate and collect one desktop and one mobile reference image.
- Record promotional footage from the actual renderer. Hide product UI, settings and FPS overlays when they distract from the artwork. Use a reproducible camera and time sequence, verify frame count and decode, and keep title cards distinct from renderer logic.
