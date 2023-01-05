import { useState } from 'react'
import Cookies from 'js-cookie'

export const useCookify = (options) => {
    /**
     * Initializing the data
     */
    const _this = {
        name: options.name || 'cookify',
        saveWithChange: options.saveWithChange || false,
        saveByDefault: options.saveByDefault || false,
        cookieDefault: options.cookieDefault || 'necessary',
        consentObject: () => {
            const newConsentObject = new Object,
                newConsentDataObject = new Object

            newConsentObject['viewed'] = false
            newConsentDataObject[_this.cookieDefault] = true
            newConsentObject['data'] = Object.assign(newConsentDataObject, options.type || {})

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
     * @returns data
     */
    const getMemoryData = () => {
        const cookie = _this.jscookie.get(_this.name)

        if (typeof cookie !== 'undefined') {
            return JSON.parse(atob(cookie))
        }

        return false
    }

    /**
     * Set the data
     * 
     * @param data
     */
    const setMemoryData = (tempConsentObject = consentObject) => {
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
            handleConsentTrackingChange(true)
        }
    }

    /**
     * Get a cookie state
     * 
     * @param {string} type 
     */
    const getDataState = (type) => {
        return consentObject.data[type]
    }

    /**
     * Changes the cookie state and saves the data
     * 
     * @param {string} type 
     * @param {boolean} value 
     * @returns {boolean} 
     */
    const changeDataState = (type, value) => {
        const newConsentObjectData = consentObject.data

        newConsentObjectData[type] = value

        handleConsentObjectChange({
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
     * @param {object} newConsentObject 
     */
    const afterSomeActions = (newConsentObject) => {
        handleConsentObjectChange(newConsentObject)
        setMemoryData()
        handleConsentDisplayedChange(false)
        handleConsentTrackingChange(true)
    }

    /**
     * Event on checkbox mouse click
     * 
     * @param {string} type
     */
    const actionCheckbox = (type) => {
        changeDataState(type, !consentObject.data[type])
        setMemoryDataWithChange()
    }

    /**
     * Event on action accept click
     */
    const actionAccept = () => {
        afterSomeActions({
            viewed: true
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
    var memoryData = getMemoryData()
    var tempConsentObject = _this.consentObject()

    if (memoryData === false) {
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

    const handleConsentObjectChange = (newConsentObject) => {
        setConsentObject(prevConsentObject => ({
            ...prevConsentObject,
            newConsentObject
        }))
    }

    const handleConsentDisplayedChange = (newConsentDisplayed) => {
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