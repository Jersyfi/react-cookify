import { createContext, useContext, useMemo } from "react";
import { useCookify } from './useCookify'

export const CookifyContext = createContext({
    consentObject: {},
    consentDisplayed: false,
    handleConsentDisplayedChange: (newConsentDisplayed) => {},
    consentTracking: 0,
    actionCheckbox: () => {},
    actionAccept: () => {},
    actionNecessary: () => {},
    actionAll: () => {},
});

export const CookifyProvider = ({ options, children }) => {
    const {
        consentObject,
        consentDisplayed,
        handleConsentDisplayedChange,
        consentTracking,
        actionCheckbox,
        actionAccept,
        actionNecessary,
        actionAll,
    } = useCookify(options)

    const context = {
        consentObject,
        consentDisplayed,
        handleConsentDisplayedChange,
        consentTracking,
        actionCheckbox,
        actionAccept,
        actionNecessary,
        actionAll,
    }

    return (
        <CookifyContext.Provider value={context}>
            {children}
        </CookifyContext.Provider>
    );
}

export const useCookifyProvider = () => {
    return useContext(CookifyContext)
}