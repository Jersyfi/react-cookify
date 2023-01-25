import React, { useEffect, useState } from 'react'
import { ConsentModalProps } from '../../types'
import { useCookifyProvider } from '../../context/cookifyContext'
import CollapsibleType from './collapsibleType'
import Support from './support'

export const ConsentModal: React.FC<ConsentModalProps> = ({ modal }) => {
    const {consentDisplayed, actionAccept, actionNecessary, actionAll} = useCookifyProvider()
    const [displayedClass, setDisplayedClass] = useState('')

    const _this = {
        support: modal?.support ?? true,
        secound_layer: {
            title: modal?.secound_layer?.title || 'Manage Cookies',
            description: modal?.secound_layer?.description || <>We use cookies to provide and secure our websites, as well as to analyze the usage of our websites, in order to offer you a great user experience. To learn more about our use of cookies see our <a href="#" style={{textDecoration: 'underline', fontWeight: 500}}>Privacy Policy</a>.</>
        },
        table: {
            headers: modal?.table.headers || {},
            types: modal?.table.types || []
        }
    }

    const handleToggle = () => {
        if (consentDisplayed) {
            setDisplayedClass('fixed inset-0 z-10 overflow-y-auto bg-black/30')
        } else {
            setDisplayedClass('hidden')
        }
    }

    useEffect(() => {
        handleToggle()
    }, [consentDisplayed])

    return (
        /* Modal Secound Layer */
        <div className={displayedClass}>
            <div className="flex min-h-full items-end justify-center text-center sm:items-center">
                <div className="relative flex flex-col h-screen sm:h-fit sm:max-h-[32rem] w-screen sm:w-fit sm:max-w-xl md:max-w-2xl transform overflow-hidden sm:rounded-lg bg-white text-left shadow-2xl transition-all sm:my-8">
                    {/* Header */}
                    <div className="grow-0 bg-gray-100 px-4 py-3 sm:px-6 border-b">
                        <h2 className="text-2xl font-semibold">{_this.secound_layer.title}</h2>
                    </div>

                    {/* Body */}
                    <div className="grow overflow-y-auto px-4 py-3 sm:px-6">
                        <p className="mb-4">{_this.secound_layer.description}</p>

                        {_this.table.types.map((type: any, index: number) => {
                            return (
                                <CollapsibleType
                                    key={index}
                                    type={type}
                                    typeDefault={modal.typeDefault}
                                    headers={_this.table.headers}
                                    last={_this.table.types.length >= (index + 1)}
                                />
                            )
                        })}
                    </div>

                    {/* Footer */}
                    <div className="grow-0 bg-gray-100 px-4 py-3 sm:px-6 grid gap-3 border-t">
                        <div className="flex flex-col sm:flex-row-reverse gap-3">
                            <button onClick={actionAll} className="inline-flex font-medium justify-center sm:w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition duration-500 text-white">
                                All
                            </button>
                            <button onClick={actionAccept} className="inline-flex font-medium justify-center sm:w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md transition duration-500 text-white">
                                Accept
                            </button>
                            <button onClick={actionNecessary} className="inline-flex font-medium justify-center sm:w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md shadow-md transition duration-500 text-white">
                                Necessary
                            </button>
                        </div>

                        <Support display={_this.support} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConsentModal