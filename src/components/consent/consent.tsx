import React, { useEffect, useState } from 'react'
import { ConsentProps } from '../../types'
import { useCookifyProvider } from '../../context/cookifyContext'
import Pause from './pause'
import OpenConsent from './openConsent'
import Detail from './detail/detail'
import Info from './info/info'

export const Consent: React.FC<ConsentProps> = ({ consent }) => {
    const {consentObject, consentDisplayed} = useCookifyProvider()
    const [pageURL, setPageURL] = useState('')
    const [infoDisplayed, setInfoDisplayed] = useState(false)
    const [detailDisplayed, setDetailDisplayed] = useState(false)

    const _this = {
        support: consent?.support ?? true,
        theme: ['light', 'dark', 'high-contrast', 'custom'].includes(consent?.theme) ? consent?.theme : 'light',
        first: consent?.first || 'info',
        force: consent?.force ?? false,
        icon: consent?.icon || 'cookie',
        reopen: consent?.reopen ?? true,
        paused: {
            title: consent?.paused?.title || 'Consent Manger Notice',
            desc: consent?.paused?.desc || 'The consent manager is paused on this side to read the privacy policy.',
            icon: consent?.paused?.icon || '⚠️',
            url: consent?.paused?.url || 'undefined',
        },
        info: {
            title: consent?.info?.title || 'We use cookies!',
            desc: consent?.info?.desc || <>Welcome! To enhance your experience, we use cookies and comply with GDPR. For more information feel free to check out our <a href="#" style={{textDecoration: 'underline', fontWeight: 500}}>privacy policy</a>.</>,
            buttons: consent?.info?.buttons || []
        },
        detail: {
            title: consent?.detail?.title || 'Manage your consent settings',
            desc: consent?.detail?.desc || <>We want your visit to our website to be awesome, so we use cookies to give you the best expirience and for remembering preferences. You can manage your cookie preferences at any time. To learn more about our use of cookies feel free to check out our <a href="#" style={{textDecoration: 'underline', fontWeight: 500}}>privacy policy</a>.</>,
            reference: () => {
                const reference = consent?.detail?.reference ?? true
            
                if (typeof reference == 'object' || reference == true) {
                    return {
                        desc: consent?.detail?.reference?.desc || 'Please provide the below information when you hand in a request about cookies.',
                        uuid: consent?.detail?.reference?.uuid || 'UUID',
                        accepted: consent?.detail?.reference?.accepted || 'Accepted',
                        updated: consent?.detail?.reference?.updated || 'Updated'
                    }
                } else {
                    return false
                }
            },
            buttons: consent?.detail?.buttons || []
        },
        table: {
            headers: consent?.table.headers || {},
            types: consent?.table.types || [],
            typeDefault: /*options.typeDefault ||*/ 'necessary'
        }
    }

    const handleOnClickInfoManage = () => {
        setInfoDisplayed(false)
        setDetailDisplayed(true)
    }

    /* Get the URL for pageURL */
    useEffect(() => {
        setPageURL(window.location.pathname)
    }, [])

    /* Listen for consentDisplayed change and decide what consent window to open */
    useEffect(() => {
        if (consentDisplayed === true) {
            _this.force && document.body.classList.add('overflow-y-hidden')

            if (_this.first == 'info' && consentObject.viewed === false) {
                setInfoDisplayed(true)
            } else {
                setDetailDisplayed(true)
            }
        } else {
            document.body.classList.remove('overflow-y-hidden')

            setInfoDisplayed(false)
            setDetailDisplayed(false)
        }
    }, [consentDisplayed])
    
    return (
        <div id="cookify" className={'cookify-theme-' + _this.theme}>
            {(_this.paused.url !== 'undefined' && _this.paused.url == pageURL && consentObject.viewed === false) ? (
                <Pause
                    icon={_this.paused.icon}
                    title={_this.paused.title}
                    desc={_this.paused.desc}
                />
            ) : (
                <>
                    <OpenConsent icon={_this.icon}/>

                    <Info 
                        show={infoDisplayed}
                        force={_this.force}
                        content={_this.info}
                        openManage={handleOnClickInfoManage}
                        support={_this.support}
                    />
                    
                    <Detail
                        show={detailDisplayed}
                        content={_this.detail}
                        table={_this.table}
                        support={_this.support}
                    />
                </>
            )}
        </div>
    )
}

export default Consent