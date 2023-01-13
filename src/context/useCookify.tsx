import { useEffect, useState } from 'react'
import { CookifyOptionsType, ConsentObjectType, ConsentObjectDataType } from "../types";
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
    const setMemoryData = (tempConsentObject: ConsentObjectType = consentObject): void => {
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
    const afterSomeActions = (newConsentObject: ConsentObjectType): void => {
        handleConsentObjectChange(newConsentObject)
        handleConsentDisplayedChange(false)
        handleConsentTrackingChange()
    }

    /**
     * Event on checkbox mouse click
     * 
     * @param {string} type
     */
    const actionCheckbox = (type: string): void => {
        if (type !== _this.typeDefault) {
            setConsentObject({
                ...consentObject,
                data: {
                    ...consentObject.data,
                    [type]: !consentObject.data[type]
                }
            })
        }

        if (_this.saveWithChange === true) {
            handleConsentTrackingChange()
        }
    }

    /**
     * Event on action accept click
     */
    const actionAccept = (): void => {
        afterSomeActions({
            ...consentObject,
            viewed: true
        })
    }
    
    /**
     * Event action accept only necessary click
     */
    const actionNecessary = (): void => {
        const newConsentObjectData: ConsentObjectDataType = {}

        for (const type in consentObject.data) {
            if (type === _this.typeDefault) {
                newConsentObjectData[type] = true
            } else {
                newConsentObjectData[type] = false
            }
        }

        afterSomeActions({
            ...consentObject,
            viewed: true,
            data: {
                ...consentObject.data,
                ...newConsentObjectData
            }
        })
    }
    
    /**
     * Event action accept all cick
     */
    const actionAll = (): void => {
        const newConsentObjectData: ConsentObjectDataType = {}

        for (const type in consentObject.data) {
            newConsentObjectData[type] = true
        }

        afterSomeActions({
            ...consentObject,
            viewed: true,
            data: {
                ...consentObject.data,
                ...newConsentObjectData
            }
        })
    }

    /* Create state object for temporary memory data storage */
    const [consentObject, setConsentObject] = useState(_this.consentObject())
    /* Create state for is consent displayed */
    const [consentDisplayed, setConsentDisplayed] = useState(false)
    /* Create state for consent tracking */
    const [consentTracking, setConsentTracking] = useState(0)

    const handleConsentObjectChange = (newConsentObject: ConsentObjectType): void => {
        setConsentObject(newConsentObject)
    }

    const handleConsentDisplayedChange = (newConsentDisplayed: boolean): void => {
        setConsentDisplayed(newConsentDisplayed)
    }

    const handleConsentTrackingChange = (): void => {
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
        }

        handleConsentObjectChange(tempConsentObject)
        handleConsentDisplayedChange(!tempConsentObject.viewed)

        /* Save by default is saveByDefault if set to true */
        if (_this.saveByDefault === true) {
            handleConsentTrackingChange()
        }
    }, [])

    /* Save the data in memory when changes need to be saved */
    useEffect(() => {
        if (consentTracking !== 0) {
            console.log('saving')
            setMemoryData()
        }
    }, [consentTracking])

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