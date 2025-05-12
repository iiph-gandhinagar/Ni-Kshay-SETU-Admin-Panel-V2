import react from "@vitejs/plugin-react";
import "dotenv/config";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-plugin-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig({
    define: {
        "process.env": {
            BASE_URL: process.env.BASE_URL,
            MEDIA_URL: process.env.MEDIA_URL,
        }
    },
    plugins: [react(), tsconfigPaths(),],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3000,
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: "assets/[name]-[hash].js",
                chunkFileNames: "assets/[name]-[hash].js",
            }
        }
    }
});
