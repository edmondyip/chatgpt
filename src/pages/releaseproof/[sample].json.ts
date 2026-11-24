import type { APIRoute } from "astro";
import fictional from "../../../data/releaseproof/fictional.json";
import foundation from "../../../data/releaseproof/surv-001.json";
export function getStaticPaths() {
  return [
    { params: { sample: "fictional" }, props: { report: fictional } },
    { params: { sample: "surv-001" }, props: { report: foundation } },
  ];
}
export const GET: APIRoute = ({ props }) =>
  new Response(JSON.stringify(props.report, null, 2) + "\n", {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
