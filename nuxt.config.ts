// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@nuxt/test-utils/module",
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxtjs/eslint-module",
    "@nuxt/icon",
    "@nuxt/fonts",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  icon: {
    customCollections: [
      {
        prefix: "icons",
        dir: "./public/assets/icons",
      },
    ],
  },
  eslint: {},
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8080/",
      googleClientId: process.env.NUXT_GOOGLE_CLIENT_ID,
      googleClientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
    },
  },
  components: [
    { path: "~/components/pages", pathPrefix: false },
    { path: "~/components", pathPrefix: false },
  ]
});
