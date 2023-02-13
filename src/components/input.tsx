import React from 'react'
import { useCookifyProvider } from '../context/cookifyContext'
import { InputProps } from '../types'

export const Input: React.FC<InputProps> = ({ name, ...rest }) => {
	const { consentObject, actionCheckbox } = useCookifyProvider()

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		actionCheckbox(e.currentTarget.name)
	}

	return (
		<input
			{...rest}
			name={name}
			checked={consentObject.data[name]}
			onChange={(e) => handleChange(e)}
		/>
	)
}

export default Input
