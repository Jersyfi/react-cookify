import React from 'react'
import { ConsentOpenConsent } from '../../types'
import { useCookifyProvider } from '../../context/cookifyContext'
import IconCookie from '../../icons/cookie'
import IconFingerprint from '../../icons/fingerprint'

export const OpenConsent: React.FC<ConsentOpenConsent> = ({icon}) => {
    const {consentDisplayed, handleConsentDisplayedChange} = useCookifyProvider()

    const oneIconOrText = () => {
        switch (icon) {
            case 'cookie':
                return <IconCookie />
            case 'fingerprint':
                return <IconFingerprint />
            default:
                return <p>{icon}</p>
        }
    }

    return (
        <div
            onClick={() => handleConsentDisplayedChange(true)}
            className={'fixed inset-x-3 sm:inset-x-5 bottom-3 sm:bottom-5 bg-[var(--c-open-bg-color)] hover:bg-[var(--c-open-bg-hover-color)] max-w-sm mr-auto shadow-lg border-2 border-[var(--c-border-color)] rounded-[var(--c-open-border-radius)] w-fit cursor-pointer transition text-[var(--c-open-text-color)] ' + (consentDisplayed ? 'hidden' : '')}
        >
            <div className="p-1">
                {oneIconOrText()}
            </div>
        </div>
    )
}

export default OpenConsent