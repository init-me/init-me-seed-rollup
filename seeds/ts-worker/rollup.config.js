import pkg from './package.json'
import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import buble from '@rollup/plugin-buble'
import worker from 'rollup-plugin-web-worker-loader'

function buildBanner(type) {
  return [
    '/*!',
    ` * ${pkg.name} ${type} ${pkg.version}`,
    ` * (c) 2020 - ${new Date().getFullYear()} jackness`,
    ' * Released under the MIT License.',
    ' */'
  ].join('\n')
}

export default [
  {
    input: './src/index.ts',
    onwarn(warning) {
      if (['CIRCULAR_DEPENDENCY', 'EVAL'].includes(warning.code)) {
        // nothing
      } else {
        console.warn(warning.message)
      }
    },
    output: [
      {
        file: './output/index.js',
        format: 'cjs',
        banner: buildBanner('cjs'),
        exports: 'named',
        sourcemap: false
      },
      {
        file: './output/index.esm.js',
        format: 'esm',
        banner: buildBanner('esm'),
        sourcemap: false
      }
    ],
    plugins: [
      nodeResolve({ mainFields: ['module', 'main', 'jsnext:main'] }),
      commonjs({
        include: [/node_modules/, /src\/proto/]
      }),
      json(),
      typescript({
        typescript: require('typescript')
      }),
      buble({ objectAssign: 'Object.assign' })
    ],
    external: [
      'js-base64',
      'axios',
      '@yy/h5service-yy-sdk',
      'protobufjs',
      'event-subscribe',
      'xmldom'
    ]
  },
  {
    input: './src/workerEntry.ts',
    onwarn(warning) {
      if (['CIRCULAR_DEPENDENCY', 'EVAL'].includes(warning.code)) {
        // NOTHING
      } else {
        console.warn(warning.message)
      }
    },
    output: [
      {
        file: './output/workerEntry.js',
        format: 'cjs',
        name: 'UnpackWorker',
        banner: buildBanner('cjs'),
        exports: 'named',
        sourcemap: false
      }
    ],
    plugins: [
      nodeResolve({ mainFields: ['module', 'main', 'jsnext:main'] }),
      commonjs({
        include: [/node_modules/, /src\/proto/],
        transformMixedEsModules: true
      }),
      worker({
        targetPlatform: 'browser'
      }),
      json(),
      typescript({
        typescript: require('typescript')
      }),
      buble({ objectAssign: 'Object.assign' })
    ]
  }
]
