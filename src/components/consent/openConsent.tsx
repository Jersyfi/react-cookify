import React from 'react'
import { ConsentOpenConsent } from '../../types'
import { useCookifyProvider } from '../../context/cookifyContext'
import IconCookie from '../../icons/cookie'
import IconFingerprint from '../../icons/fingerprint'

export const OpenConsent: React.FC<ConsentOpenConsent> = ({icon}) => {
    const {consentDisplayed, handleConsentDisplayedChange} = useCookifyProvider()

    return (
        <div
            onClick={() => handleConsentDisplayedChange(true)}
            className={'fixed inset-x-3 sm:inset-x-5 bottom-3 sm:bottom-5 bg-blue-600 hover:bg-blue-500 max-w-sm mr-auto shadow-lg shadow-blue-500/50 border-2 rounded-full w-fit cursor-pointer transition ' + (consentDisplayed ? 'hidden' : '')}
        >
            <div className="p-1">
                {icon == 'cookie' ? (
                    <IconCookie />
                ) : (
                    <IconFingerprint />
                )}
            </div>
        </div>
    )
}

export default OpenConsent