import image from 'rollup-plugin-img'
import typescript from '@rollup/plugin-typescript'
import { copyFileSync } from 'fs'

/**
 * @type {import("rollup").RollupOptions[]}
 */
export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: 'index.js',
        format: 'es'
      }
    ],
    plugins: [
      // ts编译
      typescript({
        declaration: true,
        declarationDir: 'types'
      }),
      // 图片
      image({
        // 转换
        limit: 1024 * 8 * 1000, // default (8*1000k)
        // 排除
        exclude: 'node_modules/**'
      })
    ]
  }
]

copyFileSync('./src/main.css', './main.css')
