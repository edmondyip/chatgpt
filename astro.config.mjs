import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://chatgpt.256pages.com",
  output: "static",
  trailingSlash: "always",
  devToolbar: { enabled: false },
});
