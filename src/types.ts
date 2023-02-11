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
type ConsentType = {
    support?: boolean
    theme?: ['light', 'dark', 'high-contrast', 'custom']
    first?: ['info', 'detail']
    force?: boolean
    icon?: ['cookie', 'fingerprint'] | string
}

type ReferenceType = false | {
    desc: string
    uuid: string
    accepted: string
    updated: string
}

interface ReferenceProps {
    reference: ReferenceType
}

/* Properties */
/* Consent */
export interface ConsentProps {
    consent: ConsentType
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
export interface ConsentInfoProps {
    show: boolean
    force: boolean
    content: any
    openManage: () => void
    support: boolean
}

export interface ConsentInfoWrapperProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode
}

export interface ConsentInfoButtonsProps {
    buttons: [
        {
            action: string,
            label: string,
            schema: string
        }
    ]
    openManage: () => void
}

/* Detail */
export interface ConsentDetailProps {
    show: boolean
    content: {
        title: string
        desc: string
        reference: () => ReferenceType
        buttons: any
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

export interface ConsentDetailBodyProps extends ReferenceProps {
    desc: string
    table: any
}

export interface ConsentDetailBodyCollapsibleProps {
    type: any
    tableHeaders: any
    typeDefault: string
}