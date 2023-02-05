import React, { useEffect, useState } from 'react'
import { ConsentProps } from '../../types'
import { useCookifyProvider } from '../../context/cookifyContext'
import Pause from './pause'
import OpenConsent from './openConsent'
import Detail from './detail/detail'
import Support from './support'

export const Consent: React.FC<ConsentProps> = ({consent}) => {
    const {consentObject, consentDisplayed, actionNecessary, actionAccept, actionAll} = useCookifyProvider()
    const [pageURL, setPageURL] = useState('')
    const [infoDisplayed, setInfoDisplayed] = useState(false)
    const [detailDisplayed, setDetailDisplayed] = useState(false)

    const _this = {
        support: consent?.support ?? true,
        reference: () => {
            const reference = consent?.reference ?? false

            if (reference === true) {
                return 'Please provide the below information when you hand in a request about cookies.'
            } else if (typeof reference == 'string') {
                return reference
            } else {
                return false
            }
        },
        first: consent?.first || 'info',
        force: consent?.force ?? false,
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
        <div id="cookify">
            {(_this.paused.url !== 'undefined' && _this.paused.url == pageURL && consentObject.viewed === false) ? (
                <Pause
                    icon={_this.paused.icon}
                    title={_this.paused.title}
                    desc={_this.paused.desc}
                />
            ) : (
                <>
                    <OpenConsent icon="cookie"/>

                    {/* Info */}
                    <div className={( _this.force && 'fixed inset-0 z-10 bg-black/30') + (infoDisplayed ? '' : ' hidden')}>
                        <div className="fixed inset-x-3 sm:inset-x-5 bottom-3 sm:bottom-5 bg-white max-w-sm mr-auto shadow-lg border-2 rounded-lg w-fit">
                            <div className="px-4 py-3 grid gap-6 items-center">
                                <div>
                                    <p className="text-2xl font-semibold mb-1">{_this.info.title}</p>
                                    <Support display={_this.support} />
                                </div>

                                <p>{_this.info.desc}</p>

                                <div className="flex flex-col gap-3">
                                    {_this.info.buttons.map((button: any, index: number) => {
                                        let action, schema

                                        switch (button.action) {
                                            case 'necessary':
                                                action = actionNecessary
                                                break

                                            case 'accept':
                                                action = actionAccept
                                                break

                                            case 'all':
                                                action = actionAll
                                                break

                                            case 'manage':
                                            default:
                                                action = handleOnClickInfoManage
                                                break
                                        }

                                        if (button.schema == 'week') {
                                            schema = 'bg-gray-600 hover:bg-gray-500 text-white'
                                        } else if (button.schema == 'strong') {
                                            schema = 'bg-blue-600 hover:bg-blue-500 text-white'
                                        }

                                        return (
                                            <button
                                                key={index}
                                                className={'inline-flex font-medium justify-center sm:w-full px-4 py-2 rounded-md transition duration-500 ' + schema}
                                                onClick={action}
                                            >
                                                {button.label}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <Detail
                        show={detailDisplayed}
                        label={_this.detail}
                        table={_this.table}
                        support={_this.support}
                        reference={_this.reference()}
                    />
                </>
            )}
        </div>
    )
}

export default Consent