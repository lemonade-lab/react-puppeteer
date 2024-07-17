import image from 'rollup-plugin-img'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import css from 'rollup-plugin-css-only'
import { terser } from 'rollup-plugin-terser'

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
      // json
      json(),
      // 使用 terser 插件进行代码压缩
      // terser(),
      // 解析出 css 文件，并输入到指定位置
      css({ output: 'main.css' }),
      // 图片
      image({
        // 转换
        limit: 1024 * 8 * 1000, // default (8*1000k)
        // 排除
        exclude: 'node_modules/**'
      })
    ],
    external: id => /^node_modules\//.test(id) // 排除所有位于 node_modules 目录下的模块
  }
  // 将需要排除的模块添加到这里
]
