import { ReactNode, HTMLAttributes, InputHTMLAttributes } from 'react'
import { CookieAttributes } from 'js-cookie'

/*
 * Core
 */

export type ConsentObjectDataType = {
	[key: string]: boolean
}

export type ConsentObjectType = {
	viewed: boolean
	data: ConsentObjectDataType
	uuid: string
	created_at: Date
	updated_at: Date
	revision: number
}

export interface CookifyContextProps {
	consentObject: ConsentObjectType
	consentDisplayed: boolean
	handleConsentDisplayedChange: (newConsentDisplayed: boolean) => void
	consentTracking: number
	actionCheckbox: (type: string) => void
	actionAccept: () => void
	actionNecessary: () => void
	actionAll: () => void
}

export type CookifyOptionsType = {
	name?: string
	store?: 'cookies' | 'storage'
	saveWithChange?: boolean
	saveByDefault?: boolean
	typeDefault?: string
	types?: ConsentObjectDataType
	jscookie?: CookieAttributes
	revision?: number
}

export interface CookifyProviderProps {
	options: CookifyOptionsType
	children: ReactNode
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string
}

/*
 * Consent
 */

/* Initialization */
export interface CookifyConsentProps {
	settings: ConsentSettingsType
	children: ReactNode
}

export type ConsentSettingsType = {
	options: CookifyOptionsType
	consent: ConsentType
}

type ConsentType = {
	support?: boolean
	theme?: 'light' | 'dark' | 'high-contrast' | 'custom'
	first?: 'info' | 'detail'
	force?: boolean
	icon?: 'cookie' | 'fingerprint' | string
	reopen?: boolean
	paused?: {
		title?: string
		desc?: string
		icon?: string
		url?: string
	}
	info?: {
		title?: string
		desc?: string | JSX.Element
		buttons?: InfoButtonType[]
	}
	detail?: {
		title?: string
		desc?: string | JSX.Element
		reference?:
			| false
			| {
					desc?: string
					uuid?: string
					accepted?: string
					updated?: string
			  }
		buttons?: DetailButtonType[]
	}
	table?: {
		headers?: string[]
		types: TableTypesType[]
	}
}

/* Extentions */
type ReferenceType =
	| false
	| {
			desc: string | ReactNode
			uuid: string
			accepted: string
			updated: string
	  }

interface ReferenceProps {
	reference: ReferenceType
}

export type InfoButtonType = {
	action: 'manage' | 'necessary' | 'accept' | 'all'
	label: string
	schema: 'week' | 'strong'
}

export type DetailButtonType = {
	action: 'necessary' | 'accept' | 'all'
	label: string
	schema: 'week' | 'strong'
}

type TableType = {
	headers: string[]
	types: TableTypesType[]
	typeDefault: string
}

export type TableTypesType = {
	for: string
	title: string
	desc: string | JSX.Element
	body?: TableRowType[]
}

export type TableTypesWithBodyType = {
	for: string
	title: string
	desc: string
	body: TableRowType[]
}

export type TableRowType = string[]

/* Consent */
export interface ConsentProps {
	consent: ConsentType
}

export interface ConsentSupportPorps {
	display: boolean
}

export interface ConsentOpenConsent {
	icon: string
}

export interface ConsentPausedProps {
	title: string
	desc: string
	icon: string
}

/* Info */
export interface ConsentInfoProps {
	show: boolean
	force: boolean
	content: {
		title: string
		desc: string | JSX.Element
		buttons: InfoButtonType[]
	}
	openManage: () => void
	support: boolean
}

export interface ConsentInfoWrapperProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode
}

export interface ConsentInfoButtonsProps {
	buttons: InfoButtonType[]
	openManage: () => void
}

/* Detail */
export interface ConsentDetailProps {
	show: boolean
	content: {
		title: string
		desc: string | JSX.Element
		reference: () => ReferenceType
		buttons: DetailButtonType[]
	}
	table: TableType
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
	desc: string | JSX.Element
	table: TableType
}

export interface ConsentDetailBodyCollapsibleProps {
	type: TableTypesType
	tableHeaders: string[]
	typeDefault: string
}

export interface ConsentDetailFooterProps {
	buttons: DetailButtonType[]
}
