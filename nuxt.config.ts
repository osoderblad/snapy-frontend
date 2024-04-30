// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/main.css"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      meta: [
        {
          name: "theme-color",
          content: "#09110f",
        },
      ],
    },
  },

  supabase: {
    redirect: false,
    clientOptions: { db: { schema: "domains" } },
  },
  devtools: { enabled: false },

  modules: [
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@nuxtjs/device",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
  ],

  plugins: [{ src: "~/plugins/supabasewrapper.ts" }],
  // vite: {
  //   build: {
  //     chunkSizeWarningLimit: 700,
  //     rollupOptions: {
  //       treeshake: true,
  //     },
  //   },
  // },
  // nitro: {
  //   compressPublicAssets: { brotli: true, gzip: true },
  //   minify: true,
  //   prerender: {
  //     routes: ["/"],
  //   },
  // },
  sourcemap: false,
  srcDir: "./",
  experimental: {
    asyncEntry: true,
    crossOriginPrefetch: true,
    writeEarlyHints: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  googleFonts: {
    families: {
      Nunito: [300, 700, 900],
      // Italiana: [400],
      Namdhinggo: [400, 600, 800],
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
