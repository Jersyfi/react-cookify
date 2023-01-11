import { useEffect, useState } from 'react'
import { CookifyOptionsType, ConsentObjectDataType, ConsentObjectType } from "../types";
import Cookies from 'js-cookie'

export const useCookify = (options: CookifyOptionsType) => {
    /**
     * Initializing the data
     */
    const _this = {
        name: options.name || 'cookify-consent',
        store: options.store || 'cookies',
        saveWithChange: options.saveWithChange || false,
        saveByDefault: options.saveByDefault || false,
        typeDefault: options.typeDefault || 'necessary',
        consentObject: (): ConsentObjectType => {
            const newConsentObject = {
                viewed: false,
                data: {
                    [_this.typeDefault]: true,
                },
            }, newConsentDataObject = options.type || {}

            newConsentObject['data'] = Object.assign(newConsentObject.data, newConsentDataObject)

            return newConsentObject
        },
        jscookie: Cookies.withAttributes(options.jscookie || {
            expires: 365,
            path: '/',
        }),
    }

    /**
     * Data Interaction
     */

    /**
     * Read the saved data
     * 
     * @returns {ConsentObjectType | boolean}
     */
    const getMemoryData = (): ConsentObjectType | boolean => {
        switch (_this.store) {
            case 'storage': {
                let storage

                if (typeof window !== 'undefined') {
                    storage = localStorage.getItem(_this.name)
                }

                if (typeof storage === 'string') {
                    return JSON.parse(atob(storage))
                }

                return false
            }
            case 'cookies': // cookies is the default value
            default: {
                const cookie = _this.jscookie.get(_this.name)

                if (typeof cookie !== 'undefined') {
                    return JSON.parse(atob(cookie))
                }

                return false
            }
        }
    }

    /**
     * Set the data
     * 
     * @param {ConsentObjectType} tempConsentObject
     */
    const setMemoryData = (tempConsentObject: ConsentObjectType = consentObject) => {
        const tempConsentObjectString: string = btoa(JSON.stringify(tempConsentObject))

        switch (_this.store) {
            case 'storage': {
                if (typeof window !== 'undefined') {
                    localStorage.setItem(_this.name, tempConsentObjectString)
                }
                break;
            }
            case 'cookies': // cookies is the default value
            default: {
                _this.jscookie.set(_this.name, tempConsentObjectString)
                break;
            }
        }
    }

    /**
     * Event Listeners
     */

    /**
     * Executed after some actions
     * 
     * @param {ConsentObjectType} newConsentObject 
     */
    const afterSomeActions = (newConsentObject: ConsentObjectType) => {
        handleConsentObjectChange(newConsentObject)
        setMemoryData()
        handleConsentDisplayedChange(false)
        handleConsentTrackingChange()
    }

    /**
     * Event on checkbox mouse click
     * 
     * @param {string} type
     */
    const actionCheckbox = (type: string) => {
        const newConsentObject = consentObject

        newConsentObject.data[type] = !consentObject.data[type]

        handleConsentObjectChange(newConsentObject)

        if (_this.saveWithChange === true) {
            setMemoryData()
            handleConsentTrackingChange()
        }
    }

    /**
     * Event on action accept click
     */
    const actionAccept = () => {
        const newConsentObject = consentObject

        newConsentObject['viewed'] = true

        afterSomeActions(newConsentObject)
    }
    
    /**
     * Event action accept only necessary click
     */
    const actionNecessary = () => {
        const newConsentObject = consentObject

        for (const type in newConsentObject.data) {
            if (type == _this.typeDefault) {
                newConsentObject.data[type] = true
            } else {
                newConsentObject.data[type] = false
            }
        }

        newConsentObject['viewed'] = true

        afterSomeActions(newConsentObject)
    }
    
    /**
     * Event action accept all cick
     */
    const actionAll = () => {
        const newConsentObject = consentObject

        for (const type in consentObject.data) {
            newConsentObject.data[type] = true
        }

        newConsentObject['viewed'] = true

        afterSomeActions(newConsentObject)
    }

    /* Create state object for temporary memory data storage */
    const [consentObject, setConsentObject] = useState(_this.consentObject())
    /* Create state for is consent displayed */
    const [consentDisplayed, setConsentDisplayed] = useState(false)
    /* Create state for consent tracking */
    const [consentTracking, setConsentTracking] = useState(0)

    const handleConsentObjectChange = (newConsentObject: ConsentObjectType) => {
        setConsentObject(newConsentObject)
    }

    const handleConsentDisplayedChange = (newConsentDisplayed: boolean) => {
        setConsentDisplayed(newConsentDisplayed)
    }

    const handleConsentTrackingChange = () => {
        setConsentTracking(consentTracking + 1)
    }

    /* Call only on first render */
    useEffect(() => {
        /* Check if the memory data is set and use it or create new */
        const memoryData: ConsentObjectType | boolean = getMemoryData()
        const tempConsentObject: ConsentObjectType = consentObject

        if (typeof memoryData === 'object') {
            tempConsentObject['viewed'] = memoryData.viewed

            for (const type in tempConsentObject.data) {
                tempConsentObject.data[type] = memoryData.data[type] ?? false
            }
        } else {
            setMemoryData(tempConsentObject)
        }

        handleConsentObjectChange(tempConsentObject)
        handleConsentDisplayedChange(!tempConsentObject.viewed)

        /* Save by default is saveByDefault if set to true */
        if (_this.saveByDefault === true) {
            setMemoryData()
        }
    }, [])

    return {
        consentObject,
        consentDisplayed,
        handleConsentDisplayedChange,
        consentTracking,
        actionCheckbox,
        actionAccept,
        actionNecessary,
        actionAll,
    }
}