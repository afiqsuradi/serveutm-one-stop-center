import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: "./certificate/serveutm-privateKey.key",
      cert: "./certificate/serveutm.crt",
    },
    watch: {
      usePolling: true,
    },
  },
});
