import { ReactNode } from "react";
import { CookieAttributes } from "js-cookie";

/**
 * Type for the ConsentObjectData
 * 
 * @type ConsentObjectDataType
 * @member {boolean} [key: string]
 */
export type ConsentObjectDataType = {
    [key: string]: boolean
}

/**
 * Type for the consentObject
 * 
 * @type ConsentObjectType
 * @member {boolean} viewed
 * @member {ConsentObjectDataType} data
 */
export type ConsentObjectType = {
    viewed: boolean,
    data: ConsentObjectDataType,
}

/**
 * Props for the CookifyContext
 * 
 * @interface CookifyContextProps
 * @member {ConsentObjectType} consentObject
 * @member {boolean} consentDisplayed
 * @member {function} handleConsentDisplayedChange
 * @member {number} consentTracking
 * @member {function} actionCheckbox
 * @member {function} actionAccept
 * @member {function} actionNecessary
 * @member {function} actionAll
 */
export interface CookifyContextProps {
    consentObject: ConsentObjectType,
    consentDisplayed: boolean,
    handleConsentDisplayedChange: (newConsentDisplayed: boolean) => void,
    consentTracking: number,
    actionCheckbox: (type: string) => void,
    actionAccept: () => void,
    actionNecessary: () => void,
    actionAll: () => void,
}

/**
 * Type for the options in useCookify
 * 
 * @type CookifyOptionsType
 * @member {string} name
 * @member {boolean} saveWithChange
 * @member {boolean} saveByDefault
 * @member {string} typeDefault
 * @member {ConsentObjectDataType} type
 * @member {CookieAttributes} jscookie
 */
export type CookifyOptionsType = {
    name?: string,
    store?: ['cookies', 'storage'],
    saveWithChange?: boolean,
    saveByDefault?: boolean,
    typeDefault?: string,
    type?: ConsentObjectDataType,
    jscookie?: CookieAttributes
}

/**
 * Props for the CookifyProvider
 * 
 * @interface CookifyProviderProps
 * @member {CookifyOptionsType} options
 * @member {ReactNode} children
 */
export interface CookifyProviderProps {
    options: CookifyOptionsType,
    children: ReactNode
}

/**
 * Props for CookifyInput Component
 * 
 * @interface CookifyInputProps
 * @member {string} name
 */
export interface CookifyInputProps {
    name: string
}