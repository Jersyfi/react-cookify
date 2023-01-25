import React from 'react'
import '../../styles/index.css'
import { CookifyProvider } from '../../context/cookifyContext'
import Detail from './detail/detail'
import { CookifyConsentProps } from '../../types'

export const Consent: React.FC<CookifyConsentProps> = ({settings, children}) => {
    const {options, consent} = settings

    const _this = {
        support: consent?.support ?? true,
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

    /**
     * Display Info fehlt noch
     * Option um nur Display Info oder nur Detail anzeigen zu lassen
     * switch case?
     */
    
    return (
        <CookifyProvider options={options}>
            {children}
            <Detail label={_this.detail} table={_this.table} support={_this.support}/>
        </CookifyProvider>
    )
}

export default Consent