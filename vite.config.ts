import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'resources/ts/index.ts'),
            name: 'WireKit',
            formats: ['es', 'cjs'],
            fileName: (format) => `wire-kit.${format}.js`,
        },
        rollupOptions: {
            output: {
                assetFileNames: 'wire-kit.[ext]', // outputs wire-kit.css
            },
        },
    },
});
