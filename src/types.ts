import { ReactNode } from "react";
import { CookieAttributes } from "js-cookie";

/**
 * ?
 */
export type ConsentObjectDataType = {
    [key: string]: boolean
}

/**
 * ?
 */
export type ConsentObjectType = {
    viewed: boolean,
    data: ConsentObjectDataType,
}

/**
 * ?
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
 * ?
 */
export type CookifyOptionsType = {
    name: string,
    saveWithChange?: boolean,
    saveByDefault?: boolean,
    cookieDefault?: string,
    type?: ConsentObjectDataType,
    jscookie?: CookieAttributes
}

/**
 * ?
 */
export interface CookifyProviderProps {
    options: CookifyOptionsType,
    children: ReactNode
}

/**
 * Props for CookifyInput Component
 */
export interface CookifyInputProps {
    name: string
}