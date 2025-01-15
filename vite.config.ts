import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    // define: {
    //   __APP_ENV__: env.APP_ENV, //production mode in local
    // },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
