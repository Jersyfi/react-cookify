import { useEffect, useState } from 'react'
import {
	CookifyOptionsType,
	ConsentObjectType,
	ConsentObjectDataType
} from '../types'
import Cookies from 'js-cookie'

export const useCookify = (options: CookifyOptionsType) => {
	/**
	 * Initializing the data
	 */
	const _this = {
		name: options?.name || 'cookify-consent',
		store: options?.store || 'cookies',
		saveWithChange: options?.saveWithChange || false,
		saveByDefault: options?.saveByDefault || false,
		typeDefault: options?.typeDefault || 'necessary',
		consentObject: (): ConsentObjectType => ({
			viewed: false,
			data: Object.assign({ [_this.typeDefault]: true }, options?.types || {}),
			uuid: '',
			created_at: new Date(),
			updated_at: new Date(),
			revision: options?.revision || 0
		}),
		jscookie: Cookies.withAttributes(
			options?.jscookie || {
				expires: 365,
				path: '/'
			}
		)
	}

	/**
	 * Data Interaction
	 */

	/**
	 * Read the saved data
	 *
	 * @returns {ConsentObjectType | boolean}
	 */
	const getMemoryData = (): ConsentObjectType | boolean => {
		switch (_this.store) {
			case 'storage': {
				let storage

				if (typeof window !== 'undefined') {
					storage = localStorage.getItem(_this.name)
				}

				if (typeof storage === 'string') {
					return JSON.parse(atob(storage))
				}

				return false
			}
			case 'cookies': // cookies is the default value
			default: {
				const cookie = _this.jscookie.get(_this.name)

				if (typeof cookie !== 'undefined') {
					return JSON.parse(atob(cookie))
				}

				return false
			}
		}
	}

	/**
	 * Set the data
	 *
	 * @param {ConsentObjectType} tempConsentObject
	 */
	const setMemoryData = (
		tempConsentObject: ConsentObjectType = consentObject
	): void => {
		const tempConsentObjectString: string = btoa(
			JSON.stringify(tempConsentObject)
		)

		switch (_this.store) {
			case 'storage': {
				if (typeof window !== 'undefined') {
					localStorage.setItem(_this.name, tempConsentObjectString)
				}
				break
			}
			case 'cookies': // cookies is the default value
			default: {
				_this.jscookie.set(_this.name, tempConsentObjectString)
				break
			}
		}
	}

	/**
	 * Event Listeners
	 */

	/**
	 * Executed after some actions
	 *
	 * @param {ConsentObjectType} newConsentObject
	 */
	const afterSomeActions = (newConsentObject: ConsentObjectType): void => {
		handleConsentObjectChange(newConsentObject)
		handleConsentDisplayedChange(false)
		handleConsentTrackingChange()
	}

	/**
	 * Event on checkbox mouse click
	 *
	 * @param {string} type
	 */
	const actionCheckbox = (type: string): void => {
		if (type !== _this.typeDefault) {
			if (_this.saveWithChange === true) {
				setConsentObject({
					...consentObject,
					updated_at: new Date()
				})
				handleConsentTrackingChange()
			} else {
				setConsentObject({
					...consentObject,
					data: {
						...consentObject.data,
						[type]: !consentObject.data[type]
					}
				})
			}
		}
	}

	/**
	 * Event on action accept click
	 */
	const actionAccept = (): void => {
		afterSomeActions({
			...consentObject,
			viewed: true,
			updated_at: new Date()
		})
	}

	/**
	 * Event action accept only necessary click
	 */
	const actionNecessary = (): void => {
		const newConsentObjectData: ConsentObjectDataType = {}

		for (const type in consentObject.data) {
			if (type === _this.typeDefault) {
				newConsentObjectData[type] = true
			} else {
				newConsentObjectData[type] = false
			}
		}

		afterSomeActions({
			...consentObject,
			viewed: true,
			data: {
				...consentObject.data,
				...newConsentObjectData
			},
			updated_at: new Date()
		})
	}

	/**
	 * Event action accept all cick
	 */
	const actionAll = (): void => {
		const newConsentObjectData: ConsentObjectDataType = {}

		for (const type in consentObject.data) {
			newConsentObjectData[type] = true
		}

		afterSomeActions({
			...consentObject,
			viewed: true,
			data: {
				...consentObject.data,
				...newConsentObjectData
			},
			updated_at: new Date()
		})
	}

	/* Create state object for temporary memory data storage */
	const [consentObject, setConsentObject] = useState(_this.consentObject())
	/* Create state for is consent displayed */
	const [consentDisplayed, setConsentDisplayed] = useState(false)
	/* Create state for consent tracking */
	const [consentTracking, setConsentTracking] = useState(0)

	const handleConsentObjectChange = (
		newConsentObject: ConsentObjectType
	): void => {
		setConsentObject(newConsentObject)
	}

	const handleConsentDisplayedChange = (newConsentDisplayed: boolean): void => {
		setConsentDisplayed(newConsentDisplayed)
	}

	const handleConsentTrackingChange = (): void => {
		setConsentTracking(consentTracking + 1)
	}

	/* Call only on first render */
	useEffect(() => {
		/* Check if the memory data is set and use it or create new */
		const memoryData: ConsentObjectType | boolean = getMemoryData()
		const tempConsentObject: ConsentObjectType = consentObject

		/* Can only be called on client side */
		tempConsentObject['uuid'] = [1e7, -1e3, -4e3, -8e3, -1e11]
			.join('')
			.replace(/[018]/g, (c) =>
				(
					parseInt(c, 10) ^
					(self.crypto.getRandomValues(new Uint8Array(1))[0] &
						(15 >> (parseInt(c, 10) / 4)))
				).toString(16)
			)

		/* Check if storage exists for using saved data */
		if (
			typeof memoryData === 'object' &&
			tempConsentObject.revision == memoryData?.revision
		) {
			tempConsentObject['viewed'] = memoryData.viewed

			for (const type in tempConsentObject.data) {
				tempConsentObject.data[type] = memoryData.data[type] ?? false
			}

			tempConsentObject['uuid'] = memoryData.uuid
			tempConsentObject['created_at'] = new Date(memoryData.created_at)
			tempConsentObject['updated_at'] = new Date(memoryData.updated_at)
		}

		handleConsentObjectChange(tempConsentObject)
		handleConsentDisplayedChange(!tempConsentObject.viewed)

		/* Save by default is saveByDefault if set to true */
		if (_this.saveByDefault === true) {
			setConsentObject({
				...consentObject,
				updated_at: new Date()
			})
			handleConsentTrackingChange()
		}
	}, [])

	/* Save the data in memory to save changes */
	useEffect(() => {
		if (consentTracking !== 0) {
			console.log('saving')
			setMemoryData()
		}
	}, [consentTracking])

	return {
		consentObject,
		consentDisplayed,
		handleConsentDisplayedChange,
		consentTracking,
		actionCheckbox,
		actionAccept,
		actionNecessary,
		actionAll
	}
}
