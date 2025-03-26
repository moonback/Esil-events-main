import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    esbuildOptions: {
      // Target Node.js version
      target: 'node16',
      // Enable native modules support
      define: {
        'global.process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      },
      plugins: [
        {
          name: 'fix-node-globals-polyfill',
          setup(build) {
            build.onResolve({ filter: /_stream_writable/ }, () => {
              return { path: require.resolve('stream-browserify') }
            })
          }
        }
      ]
    }
  },
  build: {
    commonjsOptions: {
      include: [/better-sqlite3/, /node_modules/]
    }
  },

});
