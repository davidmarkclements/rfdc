import { eslint } from 'rollup-plugin-eslint'
import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    { format: 'cjs', file: pkg.main },
    { format: 'es', file: pkg.module },
    { format: 'umd', file: pkg.unpkg, name: 'rfdc' }
  ],
  plugins: [
    eslint(),
    buble(),
    uglify()
  ]
}
