# react-cookify

![NPM Downloads](https://img.shields.io/npm/dt/react-cookify)
![NPM](https://img.shields.io/npm/v/react-cookify)
![Github Code Size](https://img.shields.io/github/languages/code-size/jersyfi/react-cookify)
![GitHub License](https://img.shields.io/github/license/jersyfi/react-cookify)

## General info
This is a simple full customizable cookie consent banner for gdpr law. This library is build on pure javascript for easy customization. You can choose your own CSS Framework, your own styles and only need to define query selectors.

| Framework  | State      | Repository                                                        |
| :---       | :---       | :---                                                              |
| Vanilla JS | Production | [@Jersyfi/cookify](https://github.com/Jersyfi/Cookify)            |
| React      | Dev        | [@Jersyfi/react-cookify](https://github.com/Jersyfi/react-ookify) |
| Vue.js     | Planned    | -                                                                 |

| Frameworks /<br> Features | Vanilla JS | React | Vue.js |
| :---                      | :---: | :---: | :---: |
| Headless                  | ✅ | ✅ | ❌ |
| Customizable              | ✅ | ✅ | ❌ |
| Tracking                  | ✅ | ✅ | ❌ |
| Storage: *Cookies*        | ✅ | ✅ | ❌ |
| Storage: *Local Storage*  | ✅ | ✅ | ❌ |
| Managing: *Script* [^1]   | ✅ | ❌ | ❌ |
| Managing: *Img* [^1]      | ✅ | ❌ | ❌ |
| Managing: *iframe* [^1]   | ✅ | ❌ | ❌ |

[^1]: Only in Vanilla JS the support is integrated because in Framworks like React you can do it with the state `consentObject`

### Live preview of Vanilla JS Version
View the test file live on GitHub Pages and get in touch with Cookify. The test file used the Vanilla JS version. You can find the Vanilla JS repository [here](https://github.com/jersyfi/cookify).
- [Bootstrap](https://jersyfi.github.io/Cookify/test/preview/bootstrap.html)
- [Tailwind CSS](https://jersyfi.github.io/Cookify/test/preview/tailwindcss.html)

## Documentation

### Get started

To start with that project you can simple install `react-ookify` with npm.

```bash
npm install react-cookify
```

**In progress...**

## Changelog
Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Credits
- [Jérôme Bastian Winkel](https://github.com/jersyfi)
- [All Contributors](../../contributors)

## License
The MIT License (MIT). Please see [License File](LICENSE) for more information.