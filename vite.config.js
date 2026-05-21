import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: [
        "favicon.svg",
        "favicon-64.png",
        "apple-touch-icon.png",
        "android-chrome-192.png",
        "android-chrome-512.png",
        "og-card.png",
      ],
      manifest: {
        name: "FretBloom",
        short_name: "FretBloom",
        description: "A guided guitar practice companion for beginners learning chords, tab, rhythm, and music basics.",
        id: "/",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#f3f6f4",
        theme_color: "#059669",
        categories: ["education", "music"],
        icons: [
          {
            src: "/android-chrome-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/android-chrome-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/android-chrome-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Precache all app assets
        globPatterns: ["**/*.{js,css,html,svg,png,ico,webmanifest,woff,woff2}"],

        // SPA fallback — serve index.html for all navigation requests
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api\//],

        // Take control immediately on install — no waiting for tab reload
        skipWaiting: true,
        clientsClaim: true,

        // Remove caches from old SW versions
        cleanupOutdatedCaches: true,

        // No external resources to cache at runtime — app is fully self-contained
        runtimeCaching: [],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
});
