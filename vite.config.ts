import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/buygather',

  server: {
    port: 3000,
    host: 'localhost'
  },

  preview: {
    port: 4300,
    host: 'localhost'
  },

  envPrefix: ['REACT_APP_'],

  plugins: [react(), svgr()],

  // Uncomment this if you are using workers.
  // worker: {
  //   plugins: [nxViteTsPaths()],
  // },

  build: {
    outDir: './dist/apps/powerful-hooks',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});
