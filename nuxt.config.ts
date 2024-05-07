// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/main.css"],
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxtjs/supabase", "@nuxtjs/google-fonts"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  supabase: {
    redirect: false,

    clientOptions: { db: { schema: "domains" } },
  },
  plugins: [{ src: "~/plugins/supabasewrapper.ts" }],
  googleFonts: {
    families: {
      Nunito: [300, 500, 700],
    },
    display: "swap",
    download: true,
    prefetch: true,
    preconnect: true,
    overwriting: false,
    preload: true,
    useStylesheet: true,
  },
});
