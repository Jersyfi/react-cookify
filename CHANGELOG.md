# Changelog

All notable changes to `react-cookify` will be documented in this file.

## v0.4.4-beta.1 - In progress...

* Added Web Storage API Support for the local storage
* Added `store` in `options` Object to choose between HTML cookies and Web Storage API
* Modified `getMemoryData()` and `setMemoryData()` to match the `store` in `options`

## v0.3.4-beta.1 - 2022-01-08

* Bump @rollup/plugin-typescript from 10.0.1 to 11.0.0
* Removed `changeDataState()` and directly integrated the code in `actionCheckbox()`
* Removed `setMemoryDataWithChange()` and directly integrated the code in `actionCheckbox()`
* Added script `build:watch` for development
* Modified `handleConsentObjectChange()` to fix the issue of [#2](https://github.com/Jersyfi/react-cookify/issues/2)

## v0.2.1-beta.1 - 2022-01-07

* Added `@rollup/plugin-terser` to minify and compress the code in build process
* Updated `peerDependencies` and deleted dependencies for build and install process
* Deleted `cjs` in `rollup.config.js` for the build process
* Deleted `tsc` in `package.json` for the build process
* Fixed ESLint warning with react version
* Renamed the option and inline code from `cookieDefault` to `typeDefault`

## v0.1.0-beta.3 - 2022-01-05

* Added Package [js-cookie](https://github.com/js-cookie/js-cookie/) with the option to customize with `options={{ jscookie: {} }}`
* Added Package `eslint` for better error & warning overview
* Added Package `typescript` to require modern programming
* Added Workflow for publishing as package to npm
* Added README.md with feature list to see what is supported