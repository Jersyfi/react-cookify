import React, { useEffect, useState } from 'react'
import '../../styles/index.css'
import { CookifyConsentProps } from '../../types'
import { CookifyProvider } from '../../context/cookifyContext'
import Pause from './pause'
import OpenConsent from './openConsent'
import Detail from './detail/detail'
import Consent from './consent'

export const CookifyConsent: React.FC<CookifyConsentProps> = ({settings, children}) => {
    const {options, consent} = settings
        
    return (
        <CookifyProvider options={options}>
            {children}
            <Consent consent={consent} />
        </CookifyProvider>
    )
}

export default CookifyConsent