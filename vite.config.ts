import {defineConfig} from 'vite'

// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: './lib',
        lib: {
            entry: './src/vite.ts',
            formats: ['es'],
        },
        rollupOptions: {
            // external: ['fsevents', 'node:path', 'node:fs', 'node:process', 'node:url', 'node:module']
        }
    },
})
