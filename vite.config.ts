import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    open: true,
  },
  build: {
    target: "es2015",
    outDir: resolve(__dirname, "dist"),
    lib: {
      entry: resolve(__dirname, "package/core.ts"),
      name: "kaijia-contextmenu",
      formats: ["es", "cjs", "umd"],
    },
  },
});
