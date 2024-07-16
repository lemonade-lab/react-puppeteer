import typescript from '@rollup/plugin-typescript'
const plugins = [typescript()]
const onwarn = (warning, warn) => {
  if (warning.code === 'UNRESOLVED_IMPORT') return
  warn(warning)
}
const config = [
  {
    input: 'src/index.ts',
    file: 'index.js'
  }
]
export default config.map(item => ({
  input: item.input,
  output: {
    file: item.file,
    format: 'esm',
    sourcemap: false
  },
  plugins: plugins,
  onwarn: onwarn
}))
