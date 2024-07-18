import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Set the output directory based on the mode
  const outDir = mode === "dev" ? "dist" : "prod";

  return {
    plugins: [
      react({
        fastRefresh: false,
      }),
    ],
    base: "/",
    build: {
      sourcemap: true, // Enables source maps
      minify: false,
      outDir, // Use dynamic output directory
    },
    optimizeDeps: {
      include: ["react-is", "react-map-gl"],
    },
    clearScreen: false,
    server: {
      port: 3000,
      host: true,
      hmr: false,
    },
    preview: {
      port: 3000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
