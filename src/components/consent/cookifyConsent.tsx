import React from 'react'
import '../../styles/index.css'
import { CookifyProvider } from '../../context/cookifyContext'
import ConsentModal from './consentModal'
import { CookifyConsentProps } from '../../types'

export const CookifyConsent: React.FC<CookifyConsentProps> = ({settings, children}) => {
    const {options, modal} = settings

    modal['typeDefault'] = options.typeDefault || 'necessary'
    
    return (
        <CookifyProvider options={options}>
            {children}
            <ConsentModal modal={modal}/>
        </CookifyProvider>
    )
}

export default CookifyConsent