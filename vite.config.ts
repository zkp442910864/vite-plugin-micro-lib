import {defineConfig} from 'vite'

// https://vite.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: './src/index.ts',
            formats: ['es'],
        },
        rollupOptions: {
            // external: ['fsevents', 'node:path', 'node:fs', 'node:process', 'node:url', 'node:module']
        }
    },
})
