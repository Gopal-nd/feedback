import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"


export default defineConfig({
  define: {
    "process.env": {
      NODE_ENV: "production",
    }
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib:{
      entry:'./src/index.tsx',
      name:'widget',
      fileName:(format) => `widget.${format}.js`
    },
    target: "esnext"
  },
})
