import typescript from '@rollup/plugin-typescript'
// import { randomUUID } from 'crypto';
// import { dirname, join, relative } from 'path';
/**
 * @type {import("rollup").RollupOptions[]}
 */
export default [
  {
    input: './src/index.ts',
    output: [
      {
        // lib 目录
        dir: 'lib',
        format: 'es',
        sourcemap: false,
        // 保持结构
        preserveModules: true
        // entryFileNames: (chunkInfo) => {
        //   const relativePath = relative('src', chunkInfo.facadeModuleId);
        //   return chunkInfo.name === 'index' ? 'index.js' : join(dirname(relativePath), `${randomUUID()}.js`);
        // },
      }
    ],
    plugins: [
      // ts编译
      typescript({
        compilerOptions: {
          removeComments: false, // 保留注释
          declaration: true,
          declarationDir: 'lib'
        },
        include: ['src/**/*']
      })
    ]
  }
]
