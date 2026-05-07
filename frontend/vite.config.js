import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup/setupTests.js", "./tests/setup/i18nMock.js"],
    globals: true,
    mockReset: true,
  },
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
});
