import { resolve } from 'path'
import { defineConfig, ConfigEnv } from 'vite'
import dts from 'vite-plugin-dts'
import mkcert from 'vite-plugin-mkcert'

// 'lib' | 'demo'
const target = process.env.TARGET ?? 'lib'

export default ({ command }: ConfigEnv) => {
    const isDevelopment = command === 'serve'

    if (isDevelopment) {
        return defineConfig({
            root: resolve(__dirname, 'demo'),
            base: '',
            resolve: {
                alias: {
                    '@': resolve(__dirname, './src'),
                }
            },
            plugins: [
                mkcert()
            ]
        })
    } else if (target === 'demo') {
        return defineConfig({
            plugins: [],
            resolve: {
                alias: {
                    '@': resolve(__dirname, './src'),
                }
            },
            root: resolve(__dirname, './demo'),
            build: {
                outDir: resolve(__dirname, './dist'),
            }
        })
    } else if (target === 'lib') {
        console.log('Building library')
        return defineConfig({
            build: {
                outDir: 'dist',
                sourcemap: false,
                commonjsOptions: {
                    esmExternals: true
                },
                lib: {
                    entry: resolve(__dirname, 'src/index.ts'),
                    formats: [ 'es', 'cjs', 'umd', 'iife' ],
                    name: 'ShareableJS',
                    fileName: (format: string) => `shareable.${format}.js`,
                },
            },
            plugins: [
                dts({
                    rollupTypes: false,
                    copyDtsFiles: true
                }),
            ],
            resolve: {
                alias: {
                    '@': resolve(__dirname, './src'),
                }
            },
            base: './',
        })
    }
}