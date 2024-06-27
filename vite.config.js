/* eslint-disable no-undef */
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    plugins: [react()],
    define: {
    __APP_ENV__: process.env.VITE_VERCEL_ENV,
    },
  };
});
