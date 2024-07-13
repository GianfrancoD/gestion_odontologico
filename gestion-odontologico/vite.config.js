import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  env: {
    VITE_API_URL: "VITE_API_URL",
    VITE_DEBUG: true,
  },
});
