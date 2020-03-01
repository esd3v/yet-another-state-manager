import dts from "rollup-plugin-dts";
import multi from '@rollup/plugin-multi-entry';

export default {
  input: ['src/index.ts', 'src/typings.ts'],
  output: {
    file: 'dist/typings.d.ts',
    format: 'esm',
  },
  external: ['react'],
  plugins: [
    dts(),
    multi(),
  ],
};
