import {terser} from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript2';

module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm'
  },
  external: ['react'],
  plugins: [
    terser(),
    typescript({
      tsconfig: "tsconfig.build.json",
    }),
  ],
};
