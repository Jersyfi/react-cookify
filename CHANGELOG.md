# Changelog

All notable changes to `react-cookify` will be documented in this file.

## v2.0.0-beta.1 - 2023-01-22

* Prepared for v2.0.0-beta.1 and seperated into different branches
* 

## v0.6.16-beta.1 - 2023-01-22

* Modified README for more user friendly content
* Modified `actionCheckbox()` that the default consent data type can't be changed if the input field has missing disabled
* Fixed props types in `CookifyInput`
* Added `cookifyConsent` for starting with a ready to use consent manager that is using Tailwind CSS for styling
* Added Dependencies for Styling with Tailwind CSS
* Modified Rollup for matching the Tailwind CSS styling
* Renamed `options.type` to `options.types` to match correct wording

## v0.4.12-beta.1 - 2022-01-12

* Modified README to match `options.store` feature
* Fixed the use of `options.saveByDefault` by removing the memoryData else statement
* Fixed wrong version in README
* Modified README to provide information about improved tracking
* Fixed mutation and changed the code of `action...()` functions to handle `consentObject` changes correctly
* Added `useEffect()` to listen to `consentTracking` changes for saving the memory data with `setMemoryData()` and modified the `action...()` functions with removing `setMemoryData()` and leaving only `handleConsentTrackingChange()`

## v0.4.6-beta.1 - 2022-01-11

* Added Web Storage API Support for the local storage
* Added `store` in `options` Object to choose between HTML cookies and Web Storage API
* Modified `getMemoryData()` and `setMemoryData()` to match the `store` in `options`
* Modified the initialization code in a useEffect function to only render it once
* Modified `actionCheckbox()`, `actionAccept()`, `actionAccept()` & `actionNecessary()` to fix issue of [#6](https://github.com/Jersyfi/react-cookify/issues/6)

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