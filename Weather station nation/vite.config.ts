import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/weather": {
        target: "https://xmlweather.vedur.is",
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            // Extract the `ids` from the headers
            const idsHeader = req.headers['x-ids'];
            if (idsHeader) {
              // Append `ids` to the path
              const ids = Array.isArray(idsHeader) ? idsHeader.join(';') : idsHeader;
              proxyReq.path += `&ids=${ids}`;
            }
          });
        },
        rewrite: (path) =>
          path.replace(/^\/api\/weather/, "/?op_w=xml&type=forec&lang=is&view=xml"),
      },
    },
  }
})
