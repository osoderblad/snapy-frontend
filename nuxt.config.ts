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

  runtimeConfig: {
    public: {
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      stripeSectretKey: process.env.STRIPE_SECTRET_KEY,
      appDomain: process.env.APP_DOMAIN,
      // SUPABASE_URL: process.env.SUPABASE_URL,
      // STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID,
    },
    private: {
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      stripeSectretKey: process.env.STRIPE_SECTRET_KEY,
      // STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID,
    },
  },

  modules: ["@nuxtjs/supabase", "@nuxtjs/google-fonts", "@vee-validate/nuxt"],
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
      "Nunito Sans": [300, 500, 700],
    },
    display: "swap",
    download: true,
    prefetch: true,
    preconnect: true,
    overwriting: false,
    preload: true,
    useStylesheet: true,
  },

  routeRules: {
    "/*": { ssr: false },
  },
});
