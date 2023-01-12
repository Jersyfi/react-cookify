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
#### Installation
To start with that project you can simple install `react-cookify` with npm.

```bash
npm install react-cookify
```

#### Customization Options
You can customize `CookifyProvider` with options. In the library i use [js-cookie](https://github.com/js-cookie/js-cookie) for handling cookies. In the options you can modify the attributes of js-cookie with `jscookie`. Below are all options with there default value.

```typescript
name: 'cookify-consent',
storage: 'cookies', // you can choose between 'cookies' and 'storage'
saveWithChange: false,
saveByDefault: false,
typeDefault: 'necessary',
type: {
    /* if `cookieDefault` is empty, otherwise it will use the customized `typeDefault` */
    necessary: true
},
/* js-cookie attributes */
jscookie: {
    expires: 365,
    path: '/',
}
```

#### Initializing with `CookifyProvider`
After that you need to import the `CookifyProvider` into your `_app.js` file. You also need to define the `options` in the `CookifyProvider` when you want to customize cookify.

```javascript
import '../styles/globals.css'
import { CookifyProvider } from 'react-cookify'

export default function App({ Component, pageProps }) {
    return (
        <CookifyProvider options={{
            name: 'own-cookify-consent',
            type: {
                marketing: false,
                performance: false,
            },
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

#### States & Functions of `useCookifyProvider`
We can use states and functions with `useCookifyProvider`. Below are the states and functions you can use.

```typescript
/* ConsentObjectType => { viewed: boolean, data: { [key: string]: boolean } } */
consentObject: ConsentObjectType,
consentDisplayed: boolean,
handleConsentDisplayedChange: (newConsentDisplayed: boolean) => void,
consentTracking: number,
actionCheckbox: (type: string) => void,
actionAccept: () => void,
actionNecessary: () => void,
actionAll: () => void,
```

#### Handling Consent with `useCookifyProvider` & `CookifyInput`
Now as an example we add the code to the `index.js` file but you can put it wherever you prefer.

```javascript
import { useEffect, useState } from 'react'
import { useCookifyProvider, CookifyInput } from 'react-cookify'

export default function Home() {
    const {consentDisplayed, handleConsentDisplayedChange, actionAccept, actionNecessary, actionAll} = useCookifyProvider()
    const [displayedClass, setDisplayedClass] = useState('')

    /* CSS not provided in example */
    const handleToggle = () => {
        if (consentDisplayed) {
            setDisplayedClass('block') // block => display: block
        } else {
            setDisplayedClass('hidden') // hidden => display: none
        }
    }

    useEffect(() => {
        handleToggle()
    }, [consentDisplayed])

    return (
        <>
            <button onClick={() => handleConsentDisplayedChange(true)}>
                Open Modal
            </button>

            <div className={displayedClass}>
                <div>
                    <CookifyInput type="checkbox" name="necessary" id="necessary" disabled />
                    <label htmlFor="necessary">Necessary</label>

                    <CookifyInput type="checkbox" name="marketing" id="marketing" />
                    <label htmlFor="marketing">Marketing</label>

                    <CookifyInput type="checkbox" name="performance" id="performance" />
                    <label htmlFor="performance">Performance</label>
                </div>

                <div>
                    <button onClick={actionAll}>All</button>
                    <button onClick={actionAccept}>Accept</button>
                    <button onClick={actionNecessary}>Necessary</button>
                </div>
            </div>
        </>
    )
}
```

#### Tracking
It is possible to track the activity of the accepted cookies. For the example i created a container named `cookifyContainer.js` that i put in the `_app.js`. To ensure that the data only gets tracked after initilization write an `if ()` with `consentTracking !== 0`.

```javascript
/* cookifyContainer.js */
import { useEffect } from 'react'
import { useCookifyProvider } from 'react-cookify'

export default function CookifyContainer({ children }) {
    const {consentObject, consentTracking} = useCookifyProvider()

    useEffect(() => {
        if (consentTracking !== 0) {
            console.log('You can fetch this: ', consentObject)
        }
    }, [consentTracking])

    return children
}

/* _app.js */
import '../styles/globals.css'
import { CookifyProvider } from 'react-cookify'
import CookifyContainer from '../components/CookifyContainer'

export default function App({ Component, pageProps }) {
    return (
        <CookifyProvider options={...}>
            <CookifyContainer>
                <Component {...pageProps} />
            </CookifyContainer>
        </CookifyProvider>
    )
}
```

## Framework Support & Features
You can view all library languages and supported features [here](https://github.com/Jersyfi/cookify#framework-support--features).

## Changelog
Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Credits
- [Jérôme Bastian Winkel](https://github.com/jersyfi)
- [All Contributors](../../contributors)

## License
The MIT License (MIT). Please see [License File](LICENSE) for more information.
