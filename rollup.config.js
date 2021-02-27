import { terser } from 'rollup-plugin-terser';
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript from '@rollup/plugin-typescript';
import alias from "@rollup/plugin-alias";
import modularCss from '@modular-css/rollup';
import image from '@rollup/plugin-image';
import { uglify } from "rollup-plugin-uglify";

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'build/bundle.js',
      format: 'cjs',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: 'build/bundle.esm.js',
      format: 'esm',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: 'build/bundle.min.js',
      format: 'iife',
      name: 'conce',
      sourcemap: true,
      plugins: [
        terser(),
      ],
      inlineDynamicImports: true,
    },
    // todo: es module
  ],
  plugins: [
    image(),
    alias({
      entries: [
        {find: 'react', replacement: 'preact/compat'},
        {find: 'react-dom', replacement: 'preact/compat'}
      ]
    }),
    modularCss(),
    nodeResolve({
      jsnext: true, // remove?
    }),
    commonjs(),
    typescript(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production') // todo: is this OK?
    }),
    process.env.NODE_ENV === 'production' && uglify(),
  ]
};
