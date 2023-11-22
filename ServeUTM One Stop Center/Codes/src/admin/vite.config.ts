import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: "./certificate/adminserveutm-privateKey.key",
      cert: "./certificate/adminserveutm.crt",
    },
    watch: {
      usePolling: true,
    },
  },
});
