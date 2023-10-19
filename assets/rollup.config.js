import { nodeResolve } from '@rollup/plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import { terser } from 'rollup-plugin-terser'
import multiInput from 'rollup-plugin-multi-input'
import esbuild from 'rollup-plugin-esbuild'
import styles from 'rollup-plugin-styles'
import copy from 'rollup-plugin-copy-watch'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import { transformSync } from 'esbuild'

// eslint-disable-next-line no-undef
const production = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'sandbox'
// eslint-disable-next-line no-undef
const test = process.env.NODE_ENV === 'test'

const plugins = [
  multiInput.default({ relative: 'ts/' }),
  commonjs(),
  nodePolyfills(),
  nodeResolve({ browser: true }),
  json(),
  esbuild.default({ sourceMap: true }),
  styles({
    mode: 'extract',
    url: {
      assetDir: 'css',
      publicPath: 'assets',
    },
  }),
  dynamicImportVars({
    include: './ts/**',
    exclude: './node_modules/**',
  }),
  copy({
    watch: production || test ? null : 'static',
    targets: [{ src: 'static/images/**/*', dest: '../priv/static/images' }],
  }),
  injectProcessEnv({
    // eslint-disable-next-line no-undef
    NODE_ENV: process.env.NODE_ENV || 'development',
  }),
  production && terser(),
]

export default [
  {
    input: ['ts/component.ts', 'ts/SheetContext.ts'],
    output: {
      format: 'cjs',
      dir: '../priv/static/assets',
      sourcemap: true,
      entryFileNames: `node/[name].js`,
      chunkFileNames: `node/[name].js`,
      assetFileNames: `css/[name][extname]`,
    },
    plugins,
  },
  {
    input: ['ts/component.ts', 'ts/SheetContext.ts'],
    output: {
      format: 'esm',
      dir: '../priv/static/assets',
      sourcemap: true,
      entryFileNames: `web/[name].js`,
      chunkFileNames: `web/[name].js`,
      assetFileNames: `css/[name][extname]`,
    },
    plugins,
  }
    
]