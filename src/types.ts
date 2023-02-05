import { ReactNode, HTMLAttributes, InputHTMLAttributes } from 'react'
import { CookieAttributes } from 'js-cookie'

export type ConsentObjectDataType = {
    [key: string]: boolean
}

export type ConsentObjectType = {
    viewed: boolean,
    data: ConsentObjectDataType,
    uuid: string,
    created_at: Date,
    updated_at: Date,
    revision: number
}

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

export interface CookifyProviderProps {
    options: CookifyOptionsType,
    children: ReactNode
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
}

export type CookifyModalType = {
    [key: string]: any
}

export type ConsentSettingsType = {
    options: CookifyOptionsType,
    consent: CookifyModalType
}

export interface CookifyConsentProps {
    settings: ConsentSettingsType,
    children: ReactNode
}

export interface CollapsibleTypeProps {
    type: any,
    typeDefault: string,
    headers: {
        [key: string]: string
    },
    last: boolean
}

export interface SupportPorps {
    display: boolean
}



/*
 * NEW
 * NEW
 * NEW
 */

/* Extentions */
export interface ReferenceType {
    reference: boolean | string
}

/* Properties */
/* Consent */
export interface ConsentProps {
    consent: any
}

export interface ConsentOpenConsent {
    icon: string
}

export interface ConsentPausedProps {
    icon: ReactNode
    title: string
    desc: string
}

/* Info */

/* Detail */
export interface ConsentDetailProps extends ReferenceType {
    show: boolean
    label: {
        title: string
        desc: string
    },
    table: any
    support: boolean
}

export interface ConsentDetailWrapperProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode
}

export interface ConsentDetailHeaderProps {
    title: string
    support: boolean
}

export interface ConsentDetailBodyProps extends ReferenceType {
    desc: string
    table: any
}

export interface ConsentDetailBodyCollapsibleProps {
    type: any
    tableHeaders: any
    typeDefault: string
}