import path from 'node:path';
import reactSwc from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [reactSwc()],

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                  @use "@/styles/variables" as *;
                  @use "@/styles/mixins" as *;`,
            },
        },
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
