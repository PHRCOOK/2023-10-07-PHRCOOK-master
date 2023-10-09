import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: { // <-- config vitest
    globals:true,
    environment: "jsdom",
  }
});