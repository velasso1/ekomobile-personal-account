// 9663740842 mIuBkrA8EnK8 
// 

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // plugins: [react(), mkcert()],
  build: {
    outDir: "./build",
  },
  // server: {
  //   host: "lk2-dev.ekomobile.ru",
  //   https: true,
  // },
});
