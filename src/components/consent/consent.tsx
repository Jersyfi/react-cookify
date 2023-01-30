import React, { useEffect, useState } from 'react'
import '../../styles/index.css'
import { CookifyProvider } from '../../context/cookifyContext'
import Detail from './detail/detail'
import { CookifyConsentProps } from '../../types'

export const Consent: React.FC<CookifyConsentProps> = ({settings, children}) => {
    const {options, consent} = settings
    const [pageURL, setPageURL] = useState('')

    const _this = {
        support: consent?.support ?? true,
        reference: consent?.reference ?? false,
        paused: {
            title: consent?.paused?.title || 'Consent Manger Notice',
            description: consent?.paused?.description || 'The consent manager is paused on this side to read the privacy policy.',
            icon: consent?.paused?.icon || '⚠️',
            url: consent?.paused?.url || 'undefined',
        },
        detail: {
            title: consent?.secound_layer?.title || 'Manage Cookies',
            description: consent?.secound_layer?.description || <>We use cookies to provide and secure our websites, as well as to analyze the usage of our websites, in order to offer you a great user experience. To learn more about our use of cookies see our <a href="#" style={{textDecoration: 'underline', fontWeight: 500}}>Privacy Policy</a>.</>
        },
        table: {
            headers: consent?.table.headers || {},
            types: consent?.table.types || [],
            typeDefault: options.typeDefault || 'necessary'
        }
    }

    useEffect(() => {
        setPageURL(window.location.pathname)
    }, [])

    /**
     * Display Info fehlt noch
     * Option um nur Display Info oder nur Detail anzeigen zu lassen
     * switch case?
     */
    
    return (
        <CookifyProvider options={options}>
            {children}

            {(_this.paused.url !== 'undefined' && _this.paused.url == pageURL) ? (
                <div className="fixed inset-x-3 sm:inset-x-5 bottom-3 sm:bottom-5 bg-white max-w-sm mr-auto shadow-lg border-2 rounded-lg w-fit">
                    <div className="px-3 py-2 flex gap-3 items-center">
                        <div className="text-2xl">{_this.paused.icon}</div>
                        <div>
                            <p className="text-xl font-semibold">{_this.paused.title}</p>
                            <p>{_this.paused.description}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <Detail
                    label={_this.detail}
                    table={_this.table}
                    support={_this.support}
                    reference={_this.reference}
                />
            )}
            
        </CookifyProvider>
    )
}

export default Consent