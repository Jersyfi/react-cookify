import { useState } from 'react'
import { ConsentObjectDataType, ConsentObjectType, CookifyProviderProps } from "../types";
import Cookies from 'js-cookie'

export const useCookify = (options: CookifyProviderProps.Options) => {
    /**
     * Initializing the data
     */
    const _this = {
        name: options.name || 'cookify',
        saveWithChange: options.saveWithChange || false,
        saveByDefault: options.saveByDefault || false,
        cookieDefault: options.cookieDefault || 'necessary',
        consentObject: (): ConsentObjectType => {
            const newConsentObject = {
                viewed: false,
                data: {
                    [_this.cookieDefault]: true,
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
        const cookie = _this.jscookie.get(_this.name)

        if (typeof cookie !== 'undefined') {
            return JSON.parse(atob(cookie))
        }

        return false
    }

    /**
     * Set the data
     * 
     * @param {ConsentObjectType} tempConsentObject
     */
    const setMemoryData = (tempConsentObject: ConsentObjectType = consentObject) => {
        _this.jscookie.set(
            _this.name,
            btoa(JSON.stringify(tempConsentObject))
        )
    }

    /**
     * Set memory data with change
     */
    const setMemoryDataWithChange = () => {
        if (_this.saveWithChange === true) {
            setMemoryData()
            handleConsentTrackingChange()
        }
    }

    /**
     * Changes the cookie state and saves the data
     * 
     * @param {string} type 
     * @param {boolean} value
     */
    const changeDataState = (type: string, value: boolean) => {
        const newConsentObjectViewed: boolean = consentObject.viewed
        const newConsentObjectData: ConsentObjectDataType = consentObject.data

        newConsentObjectData[type] = value

        handleConsentObjectChange({
            viewed: newConsentObjectViewed,
            data: newConsentObjectData
        })
        setMemoryDataWithChange()
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
        changeDataState(type, !consentObject.data[type])
        setMemoryDataWithChange()
    }

    /**
     * Event on action accept click
     */
    const actionAccept = () => {
        const newConsentObjectData = consentObject.data

        afterSomeActions({
            viewed: true,
            data: newConsentObjectData
        })
    }
    
    /**
     * Event action accept only necessary click
     */
    const actionNecessary = () => {
        const newConsentObjectData = consentObject.data

        for (const type in newConsentObjectData) {
            if (type == _this.cookieDefault) {
                newConsentObjectData[type] = true
            } else {
                newConsentObjectData[type] = false
            }
        }

        afterSomeActions({
            viewed: true,
            data: newConsentObjectData
        })
    }
    
    /**
     * Event action accept all cick
     */
    const actionAll = () => {
        const newConsentObjectData = consentObject.data

        for (const type in consentObject.data) {
            newConsentObjectData[type] = true
        }

        afterSomeActions({
            viewed: true,
            data: newConsentObjectData
        })
    }

    /* Check if the memory data is set and use it or create new */
    const memoryData: ConsentObjectType | boolean = getMemoryData()
    const tempConsentObject: ConsentObjectType = _this.consentObject()

    if (typeof memoryData !== 'boolean') {
        setMemoryData(tempConsentObject)
    } else {
        tempConsentObject['viewed'] = memoryData.viewed

        for (const type in tempConsentObject.data) {
            tempConsentObject.data[type] = memoryData.data[type] ?? false
        }
    }

    /* Create state object for temporary memory data storage */
    const [consentObject, setConsentObject] = useState(tempConsentObject)
    /* Create state for is consent displayed */
    const [consentDisplayed, setConsentDisplayed] = useState(!tempConsentObject.viewed)
    /* Create state for consent tracking */
    const [consentTracking, setConsentTracking] = useState(0)

    const handleConsentObjectChange = (newConsentObject: ConsentObjectType) => {
        setConsentObject(prevConsentObject => ({
            ...prevConsentObject,
            newConsentObject
        }))
    }

    const handleConsentDisplayedChange = (newConsentDisplayed: boolean) => {
        setConsentDisplayed(newConsentDisplayed)
    }

    const handleConsentTrackingChange = () => {
        setConsentTracking(consentTracking + 1)
    }

    /* Save by default is saveByDefault if set to true */
    if (_this.saveByDefault === true) {
        setMemoryData()
    }

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