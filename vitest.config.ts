import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    globals: true,
    css: true,

    include: ["src/tests/**/*.{test,spec}.{ts,tsx}"],

    coverage: {
      provider: "v8",

      reporter: ["text", "html"],

      exclude: [
        "src/tests/**",

        // Type-only files
        "**/*.d.ts",
        "**/*.type.ts",

        // Barrel files
        "**/index.ts",
        "**/index.tsx",

        // Icons / static assets
        "src/icons/**",

        // Next / generated files
        ".next/**",
        "node_modules/**",

        // Config files
        "**/*.config.*",

        // Optional: generic UI primitives
        "src/components/ui/**",
      ],
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});