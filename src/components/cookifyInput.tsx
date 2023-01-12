import React from "react";
import { useCookifyProvider } from '../context/cookifyContext'
import { CookifyInputProps } from '../types'

export const CookifyInput: React.FC<CookifyInputProps> = (props) => {
    const {consentObject, actionCheckbox} = useCookifyProvider()

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        actionCheckbox(e.currentTarget.name)
    }

    return (
        <input
            {...props}
            checked={consentObject.data[props.name]}
            onChange={e => handleChange(e)}
        />
    )
}

export default CookifyInput