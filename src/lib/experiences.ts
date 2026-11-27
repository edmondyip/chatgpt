export const cinematicSkillsRepository = "https://github.com/edmondyip/cinematic-skills";
export const cinematicSkillsCatalogue = `${cinematicSkillsRepository}#skill-catalogue`;

export const cinematicSkills = {
  "interactive-ocean": "Interactive ocean",
  "underwater-caustics": "Underwater caustics",
  "refracted-shadows": "Refracted shadows",
  "underwater-lighting": "Underwater lighting",
  "floating-object-physics": "Floating-object physics",
  "procedural-day-night": "Procedural day/night",
} as const;

export interface Experience {
  id: string;
  title: string;
  description: string;
  route: `/${string}/`;
  preview: { image: string; shareImage: string; alt: string; width: number; height: number };
  sourceUrl: string;
  skills: readonly (keyof typeof cinematicSkills)[];
  accent?: string;
  browserRequirements: string;
}

export const experiences = {
  glasswater: {
    id: "glasswater",
    title: "Glasswater 1.0 — Lagoon",
    description: "Explore a real-time WebGL 2 lagoon with interactive waves, floating spheres, daylight and sunset, refracted seabed shadows, and underwater illumination.",
    route: "/glasswater/",
    preview: { image: "/glasswater/preview.webp", shareImage: "/glasswater/share.png",
      alt: "Floating spheres on a lagoon lit by the setting sun.", width: 1200, height: 630 },
    sourceUrl: "https://github.com/edmondyip/glasswater",
    skills: ["interactive-ocean", "underwater-caustics", "refracted-shadows",
      "underwater-lighting", "floating-object-physics", "procedural-day-night"],
    accent: "#e6d9b8",
    browserRequirements: "Requires WebGL 2 with working graphics acceleration.",
  },
} satisfies Record<string, Experience>;
