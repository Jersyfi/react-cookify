import { useCookifyProvider } from '../context/cookifyContext'

export default function CookifyInput(props) {
    const {consentObject, actionCheckbox} = useCookifyProvider()

    const handleChange = (e) => {
        actionCheckbox(e.target.name)
    }

    return (
        <input
            {...props}
            checked={consentObject.data[props.name]}
            onChange={e => handleChange(e)}
        />
    )
}