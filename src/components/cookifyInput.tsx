import React from "react";
import { useCookifyProvider } from '../context/cookifyContext'
import { CookifyInputProps } from '../types'

export const CookifyInput: React.FC<CookifyInputProps> = ({ name, ...rest }) => {
    const {consentObject, actionCheckbox} = useCookifyProvider()

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        actionCheckbox(e.currentTarget.name)
    }

    return (
        <input
            {...rest}
            name={name}
            checked={consentObject.data[name]}
            onChange={e => handleChange(e)}
        />
    )
}

export default CookifyInput