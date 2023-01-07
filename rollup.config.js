import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from '@rollup/plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import dts from "rollup-plugin-dts";

export default [
    {
        input: "src/index.ts",
        output: {
                dir: "dist",
                format: "esm",
                sourcemap: true,
        },
        plugins: [
            external(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            terser(),
        ],
    },
    {
        input: "dist/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts.default()]
    }
]