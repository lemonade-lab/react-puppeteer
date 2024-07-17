import image from 'rollup-plugin-img'
import typescript from '@rollup/plugin-typescript'
import css from 'rollup-plugin-css-only'

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
      // 解析出 css 文件，并输入到指定位置
      css({ output: 'main.css' }),
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
