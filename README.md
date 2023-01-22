# 🍪 react-cookify

![npm](https://img.shields.io/npm/dm/react-cookify)
![NPM](https://img.shields.io/npm/v/react-cookify)
![Github Code Size](https://img.shields.io/github/languages/code-size/jersyfi/react-cookify)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-cookify)
![GitHub License](https://img.shields.io/github/license/jersyfi/react-cookify)

## Overview
This React library provides a customizable, simple to use and also a headless solution for creating a cookie consent manager and handling GDPR compliance. It is built specifically for React.js and offers a straightforward way to manage cookies and handle GDPR regulations in your React application.

How to handle GDPR correctly can be found on [Cookies, the GDPR, and the ePrivacy Directive](https://gdpr.eu/cookies).

## Preview
View and test how Cookify works in either [Bootstrap](https://jersyfi.github.io/cookify/test/preview/bootstrap.html) or [Tailwind CSS](https://jersyfi.github.io/cookify/test/preview/tailwindcss.html).

## Documentation

### Get started

#### Installation
Install `react-cookify` via npm.

```bash
npm install react-cookify
```

> **Advanced guide (Headless)**
> Create your own Cookify Consent Manager

#### Add Cookify to your App
Start with adding the `CookifyProvider` to your App.

```javascript
import '../styles/globals.css'
import { CookifyProvider } from 'react-cookify'

export default function App({ Component, pageProps }) {
    return (
        <CookifyProvider options={{
            name: 'own-cookify-consent',
            types: {
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

Now add the logic to your Home page.

```javascript
import { useEffect, useState } from 'react'
import { useCookifyProvider, CookifyInput } from 'react-cookify'

export default function Home() {
    const {consentObject, consentDisplayed, handleConsentDisplayedChange, consentTracking, actionAccept, actionNecessary, actionAll} = useCookifyProvider()
    const [displayedClass, setDisplayedClass] = useState('')

    /* CSS not provided in example */
    const handleToggle = () => {
        if (consentDisplayed) {
            setDisplayedClass('block') // block => display: block
        } else {
            setDisplayedClass('hidden') // hidden => display: none
        }
    }

    /* Display the consent management */
    useEffect(() => {
        handleToggle()
    }, [consentDisplayed])

    /* Track the data if needed */
    useEffect(() => {
        if (consentTracking !== 0) { // Only track after initialization
            console.log('Track data here', consentObject)
        }
    }, [consentTracking])

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

#### Configure Cookify
All configuration options with its default values.

```typescript
name: 'cookify-consent',
storage: 'cookies', // ['cookies' and 'storage']
saveWithChange: false,
saveByDefault: false,
typeDefault: 'necessary',
types: {
    // `necessary: true` will be set automatically
    // if `typeDefault` is empty, otherwise it will use the customized `typeDefault` instead of `necessary`
},
// js-cookie attributes
// Only needed when using `storage: 'cookies'`
// More information on https://github.com/js-cookie/js-cookie
jscookie: {
    expires: 365,
    path: '/',
}
```

> **Simple guide**
> comming soon

### Provider interaction

#### States

##### consentObject
**Type:** consentObject: ConsentObjectType
**Syntax:** consentObject
```bash
console.log(consentObject)

> Object: {
    viewed: false,
    data: {
      'necessary': true,
      'marketing': false,
      'performance': false,
    },
  }
```

##### consentDisplayed
**Type:** consentDisplayed: boolean
**Syntax:** consentDisplayed
```bash
console.log(consentDisplayed)

> false
```

##### handleConsentDisplayedChange
**Type:** handleConsentDisplayedChange: (newConsentDisplayed: boolean) => void
**Syntax:** handleConsentDisplayedChange(false)
```javascript
<button onClick={() => handleConsentDisplayedChange(true)}>
    Open Modal
</button>
```

##### consentTracking
**Type:** consentTracking: number
**Syntax:** consentTracking
```bash
console.log(consentTracking)

> 0
```

#### Actions

##### actionCheckbox
**Type:** actionCheckbox: (type: string) => void
**Syntax:** actionCheckbox('type')
```javascript
<input
    type="checkbox"
    name="marketing"
    id="marketing"
    checked={consentObject.data['marketing']}
    onChange={() => actionCheckbox('marketing')}
/>
```

##### actionAccept
**Type:** actionAccept: () => void
**Syntax:** actionAccept
```javascript
<button onClick={actionAccept}>Accept</button>
```

##### actionNecessary
**Type:** actionNecessary: () => void
**Syntax:** actionNecessary
```javascript
<button onClick={actionNecessary}>Necessary</button>
```

##### actionAll
**Type:** actionAll: () => void
**Syntax:** actionAll
```javascript
<button onClick={actionAll}>All</button>
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
