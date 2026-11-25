// Keep gtag and its automatic DOM listeners in this empty document.
// Only the public route and fixed event names cross from the site.
window.startAnalytics = function (route) {
  const id = "G-4ZJ8QXKEXV";
  window.dataLayer = [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  const settings = {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    allow_enhanced_conversions: false,
    cookie_domain: "none",
    page_location: "https://chatgpt.256pages.com" + route,
    page_title: route === "/" ? "Home" : route.replaceAll("/", ""),
    page_referrer: "",
    ignore_referrer: true,
  };
  // Apply privacy and page-view settings before the tag processes its startup event.
  window.gtag("set", settings);
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("config", id, settings);
  window.gtag("js", new Date());
  const script = document.createElement("script");
  script.async = true;
  script.referrerPolicy = "no-referrer";
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
  document.head.append(script);
};
