import {terser} from "rollup-plugin-terser";
import ts from "@wessberg/rollup-plugin-ts";

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'esm'
    },
    external: ['react'],
    plugins: [
      terser(),
      ts(),
    ],
  },
];
