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
export namespace CookifyProviderProps {
    export interface Options {
        name: string,
        saveWithChange?: boolean,
        saveByDefault?: boolean,
        cookieDefault?: string,
        type?: ConsentObjectDataType,
        jscookie?: CookieAttributes
    }

    export type Children = ReactNode
}

/**
 * Props for CookifyInput Component
 */
export interface CookifyInputProps {
    name: string
}