import { resolve } from 'path'
import { defineConfig, ConfigEnv } from 'vite'
import dts from 'vite-plugin-dts'
import mkcert from 'vite-plugin-mkcert'

export default ({ command }: ConfigEnv) => {
    const isDevelopment = command === 'serve'

    return defineConfig({
        // Change the root only if we're in development mode
        root: isDevelopment
            ? resolve(__dirname, 'demo')
            : __dirname,
        build: {
            rollupOptions: {
                output: {
                    exports: 'named',
                },
            },
            outDir: 'dist',
            sourcemap: true,
            commonjsOptions: {
                esmExternals: true,
            },
            lib: {
                entry: resolve(__dirname, 'src/index.ts'),
                formats: [ 'es', 'cjs', 'umd', 'iife' ],
                name: 'ShareableJS',
                fileName: (format) => `shareable.${format}.js`,
            },
        },
        plugins: [
            mkcert(),
            dts({
                copyDtsFiles: true,
                rollupTypes: true,
            })
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
            },
        },
    })
}