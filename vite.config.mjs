import { defineConfig } from "vite";
import { resolve } from "path";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
    esbuild: {
        minify: isProduction,
        drop: isProduction ? ["console", "debugger"] : [],
    },
    build: {
        target: "modules",
        lib: {
            entry: resolve(__dirname, "assets/init.js"),
            name: "vingtcinq",
        },
        outDir: resolve(__dirname, "dist"),
    },
});
