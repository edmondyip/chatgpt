import type { APIRoute } from "astro";
import { experiences } from "../lib/experiences";
export const GET: APIRoute = ({ site }) => {
  const routes = ["/", "/products/", "/journal/", "/finances/", "/about/", "/releaseproof/", ...Object.values(experiences).map(experience => experience.route)];
  const urls = routes
    .map((path) => `<url><loc>${new URL(path, site).href}</loc></url>`)
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
