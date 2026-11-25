import support from "../../data/support.json";

const id = "G-4ZJ8QXKEXV";
const preferenceKey = "survival.analytics.v1";
const routes = [
  "/",
  "/products/",
  "/journal/",
  "/finances/",
  "/about/",
  "/releaseproof/",
];
type Choice = "accepted" | "rejected";
type EventName =
  | "page_view"
  | "tool_open"
  | "demo_start"
  | "demo_complete"
  | "support_click"
  | "gemini_referral_click";
type Tag = (...args: unknown[]) => void;
type TagWindow = Window & { startAnalytics: (route: string) => void; gtag: Tag } & Record<
    `ga-disable-${string}`,
    boolean
  >;

function preference(): Choice | null {
  try {
    const value = localStorage.getItem(preferenceKey);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

let choice = preference();
let frame: HTMLIFrameElement | undefined;
let tag: Tag | undefined;
let pending: EventName[] = [];
let countedPage = false;
const route = location.pathname;
const panel = document.querySelector<HTMLElement>("#analytics-consent")!;
const settings = document.querySelector<HTMLButtonElement>(
  "#analytics-settings",
)!;

function send(name: EventName) {
  if (choice !== "accepted" || !frame) return false;
  if (tag) tag("event", name);
  else pending.push(name);
  return true;
}

export function trackDemo(name: "demo_start" | "demo_complete") {
  return send(name);
}

function start() {
  if (frame || !route || !routes.includes(route)) return;
  const host = document.createElement("iframe");
  host.hidden = true;
  host.title = "Site analytics";
  host.referrerPolicy = "no-referrer";
  frame = host;
  if (!countedPage) {
    send("page_view");
    if (route === "/releaseproof/") send("tool_open");
    countedPage = true;
  }
  host.onload = () => {
    if (frame !== host || choice !== "accepted") return;
    const target = host.contentWindow as TagWindow;
    if (typeof target.startAnalytics !== "function") return; // Frame unavailable offline.
    target.startAnalytics(route);
    tag = target.gtag;
    for (const event of pending) send(event);
    pending = [];
  };
  host.src = "/analytics/frame.html";
  document.body.append(host);
}

function stop() {
  if (frame?.contentWindow)
    (frame.contentWindow as TagWindow)[`ga-disable-${id}`] = true;
  frame?.remove();
  frame = undefined;
  tag = undefined;
  pending = [];
  for (const cookie of ["_ga", "_ga_4ZJ8QXKEXV"]) {
    document.cookie = cookie + "=; Max-Age=0; Path=/; SameSite=Lax";
  }
}

function apply(next: Choice | null) {
  const previous = choice;
  choice = next;
  panel.hidden = choice !== null;
  settings.setAttribute("aria-expanded", String(!panel.hidden));
  if (choice === "accepted") start();
  else if (previous === "accepted" || choice === "rejected") stop();
}
for (const button of panel.querySelectorAll<HTMLButtonElement>(
  "button[data-consent]",
)) {
  button.addEventListener("click", () => {
    const next = button.dataset.consent as Choice;
    try {
      localStorage.setItem(preferenceKey, next);
    } catch {
      /* Current page only. */
    }
    const returnFocus = panel.dataset.fromFooter === "true";
    apply(next);
    if (returnFocus) settings.focus();
  });
}
settings.addEventListener("click", () => {
  panel.hidden = false;
  panel.dataset.fromFooter = "true";
  settings.setAttribute("aria-expanded", "true");
  panel.querySelector("button")?.focus();
});
document.addEventListener(
  "click",
  (event) => {
    const link =
      event.target instanceof Element ? event.target.closest("a") : null;
    if (link?.href === support.checkoutUrl) send("support_click");
    if (link?.href === "https://gemini.256pages.com/")
      send("gemini_referral_click");
  },
  { capture: true },
);
window.addEventListener("storage", (event) => {
  if (event.key === preferenceKey || event.key === null) apply(preference());
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted) apply(preference());
});
apply(choice);
