import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss() as any,
    ],
  },

  modules: ["@nuxt/fonts", "@nuxt/image", "@nuxt/icon"],

  fonts: {
    families: [
      { name: "Poppins", provider: "google" },
      { name: "Roboto Condensed", provider: "google" },
      { name: "Nunito Sans", provider: "google" },
    ],
  },
});