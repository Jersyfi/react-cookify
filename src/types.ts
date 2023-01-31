import { ReactNode, HTMLAttributes, InputHTMLAttributes } from 'react'
import { CookieAttributes } from 'js-cookie'

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
    uuid: string,
    created_at: Date,
    updated_at: Date,
    revision: number
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
 * @member {ConsentObjectDataType} types
 * @member {CookieAttributes} jscookie
 */
export type CookifyOptionsType = {
    name?: string,
    store?: ['cookies', 'storage'],
    saveWithChange?: boolean,
    saveByDefault?: boolean,
    typeDefault?: string,
    types?: ConsentObjectDataType,
    jscookie?: CookieAttributes,
    revision?: number
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
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
}

/**
 * Type for the modal in settings
 * 
 * @type CookifyModalType
 * @member {any} [key: string]
 */
export type CookifyModalType = {
    [key: string]: any
}

/**
 * Type for the consent settings
 * 
 * @type ConsentSettingsType
 * @member {CookifyOptionsType} options
 * @member {CookifyModalType} modal
 */
export type ConsentSettingsType = {
    options: CookifyOptionsType,
    consent: CookifyModalType
}

/**
 * Props for CookifyConsent Component
 * 
 * @interface CookifyConsentProps
 * @member {ConsentSettingsType} settings
 * @member {ReactNode} children
 */
export interface CookifyConsentProps {
    settings: ConsentSettingsType,
    children: ReactNode
}

/**
 * Props for Consent Modal Component
 * 
 * @interface ConsentModalProps
 * @member {CookifyModalType} modal
 */
export interface ConsentModalProps {
    label: any,
    table: any,
    support: boolean,
    reference: boolean
}

/**
 * Props for collapsible type props
 * 
 * @interface CollapsibleTypeProps
 * @member {any} type
 * @member {string} typeDefault
 * @member {boolean} last
 */
export interface CollapsibleTypeProps {
    type: any,
    typeDefault: string,
    headers: {
        [key: string]: string
    },
    last: boolean
}

/**
 * 
 */
export interface SupportPorps {
    display: boolean
}



/**
 * NEW
 * NEW
 * NEW
 */

/**
 * Consent
 */
export interface ConsentOpenConsent {
    icon: string
}

export interface ConsentPausedProps {
    icon: ReactNode
    title: string
    description: string
}

/* Detail */
export interface ConsentDetailWrapperProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode
}

export interface ConsentDetailHeaderProps {
    title: string
}

export interface ConsentDetailBodyProps {
    description: string
    table: any
    reference: boolean
}

export interface ConsentDetailFooterProps {
    support: boolean
}

export interface ConsentDetailBodyCollapsibleProps {
    type: any
    tableHeaders: any
    typeDefault: string
}