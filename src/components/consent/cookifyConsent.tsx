import React from 'react'
import { CookifyProvider } from '../../context/cookifyContext'
import ConsentModal from './consentModal'
import { CookifyConsentProps } from '../../types'

export const CookifyConsent: React.FC<CookifyConsentProps> = ({options, children}) => {
    return (
        <CookifyProvider options={options}>
            {children}
            <ConsentModal />
        </CookifyProvider>
    )
}

export default CookifyConsent