import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/wikimedia": {
        target: "https://upload.wikimedia.org",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wikimedia/, ""),
      },
      "/porsche-files": {
        target: "https://files.porsche.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/porsche-files/, ""),
      },
      "/soundjay": {
        target: "https://www.soundjay.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/soundjay/, ""),
      },
    },
  },
});
