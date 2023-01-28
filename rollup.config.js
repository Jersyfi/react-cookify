import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
//import terser from "@rollup/plugin-terser";
import external from "rollup-plugin-peer-deps-external";
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
            postcss({
                config: {
                    path: "./postcss.config.js",
                },
                extensions: [".css"],
                minimize: true,
                inject: {
                    insertAt: "top",
                },
            }),
            external(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            //terser(),
        ],
    },
    {
        input: "dist/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts.default()],
        external: [/\.css$/u]
    }
]