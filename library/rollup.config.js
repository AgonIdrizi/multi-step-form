import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
// import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import serve from 'rollup-plugin-serve';
import ts from '@wessberg/rollup-plugin-ts';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: [
    'src/index.ts',
    'src/components/FormContainer/FormContainer.tsx',
  ],
  output: [
    {
      dir: 'lib',
      format: 'cjs',
      sourcemap: true,
    },
    {
      dir: 'lib',
      format: 'esm',
      sourcemap: true,
    },
  ],
  preserveModules: true,
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    peerDepsExternal(),
    postcss({
      modules: true,
    }),
    resolve({
      browser: true,
    }),
    commonjs(),

    // ts({
    //   transpiler: 'babel',
    // }),
    typescript({ useTsconfigDeclarationDir: true }),
    // babel({
    //   babelHelpers: 'runtime',
    //   exclude: 'node_modules/**',
    // }),
    // typescript({ sourceMap: true }),
    terser({
      module: true,
    }),
  ],
};
