# react-cookify

![NPM Downloads](https://img.shields.io/npm/dt/react-cookify)
![NPM](https://img.shields.io/npm/v/react-cookify)
![Github Code Size](https://img.shields.io/github/languages/code-size/jersyfi/react-cookify)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-cookify)
![GitHub License](https://img.shields.io/github/license/jersyfi/react-cookify)

## General info
This is a simple full customizable cookie consent for gdpr law. This library is build for react and easy customization. You can choose your own CSS Framework, own styles and only need to define options and implement simple code into your react app.

### Live preview of Vanilla JS Version
View the test file live on GitHub Pages and get in touch with Cookify. The test file used the Vanilla JS version. You can find the Vanilla JS repository [here](https://github.com/jersyfi/cookify).
- [Bootstrap](https://jersyfi.github.io/cookify/test/preview/bootstrap.html)
- [Tailwind CSS](https://jersyfi.github.io/cookify/test/preview/tailwindcss.html)

## Documentation

### Get started

To start with that project you can simple install `react-cookify` with npm.

```bash
npm install react-cookify
```

After that you need to import the `CookifyProvider` into your `_app.js` file. You also need to define the `options` in the `CookifyProvider` when you want to customize cookify. For that the below options are provided.

```typescript
/* Every option can be empty in the CookifyProvider */
name?: string,
saveWithChange?: boolean,
saveByDefault?: boolean,
cookieDefault?: string,
type?: ConsentObjectDataType,
jscookie?: CookieAttributes
```

For the above options are default values that makes it possible to pass some of the options.

```typescript
name: 'cookify-consent',
saveWithChange: false,
saveByDefault: false,
typeDefault: 'necessary',
type: {
    /* if `cookieDefault` is empty, otherwise it will use the customized `typeDefault` */
    necessary: true
},
jscookie: {
    expires: 365,
    path: '/',
}
```

Now implement the `CookifyProvider` with or without your options in the `_app.js`.

```javascript
import '../styles/globals.css'
import { CookifyProvider } from 'react-cookify'

export default function App({ Component, pageProps }) {
    return (
        <CookifyProvider options={{
            name: 'cookify-consent',
            type: {
                marketing: false,
                statistics: false,
                performance: false,
            },
            /* js-cookie options */
            jscookie: {
                expires: 365,
                path: '/',
                secure: true,
            }
        }}>
            <Component {...pageProps} />
        </CookifyProvider>
    )
}
```

**In progress...**

## Framework Support & Features
You can view all library languages and supported features [here](https://github.com/Jersyfi/cookify#framework-support--features).

## Changelog
Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Credits
- [Jérôme Bastian Winkel](https://github.com/jersyfi)
- [All Contributors](../../contributors)

## License
The MIT License (MIT). Please see [License File](LICENSE) for more information.
