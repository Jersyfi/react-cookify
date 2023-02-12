import React, { createContext, useContext } from 'react'
import { useCookify } from './useCookify'
import { CookifyContextProps, CookifyProviderProps } from '../types'

export const CookifyContext = createContext<CookifyContextProps>({
	consentObject: {
		viewed: false,
		data: {},
		uuid: '',
		created_at: new Date(),
		updated_at: new Date(),
		revision: 0
	},
	consentDisplayed: false,
	handleConsentDisplayedChange: () => {
		/* do nothing */
	},
	consentTracking: 0,
	actionCheckbox: () => {
		/* do nothing */
	},
	actionAccept: () => {
		/* do nothing */
	},
	actionNecessary: () => {
		/* do nothing */
	},
	actionAll: () => {
		/* do nothing */
	}
})

export const CookifyProvider = ({
	options,
	children
}: CookifyProviderProps) => {
	CookifyContext.Consumer

	const {
		consentObject,
		consentDisplayed,
		handleConsentDisplayedChange,
		consentTracking,
		actionCheckbox,
		actionAccept,
		actionNecessary,
		actionAll
	} = useCookify(options)

	const context = {
		consentObject,
		consentDisplayed,
		handleConsentDisplayedChange,
		consentTracking,
		actionCheckbox,
		actionAccept,
		actionNecessary,
		actionAll
	}

	return (
		<CookifyContext.Provider value={context}>
			{children}
		</CookifyContext.Provider>
	)
}

export const useCookifyProvider = () => {
	return useContext(CookifyContext)
}
