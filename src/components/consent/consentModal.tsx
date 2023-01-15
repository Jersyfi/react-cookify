import React, { useEffect, useState } from 'react'
import { useCookifyProvider } from '../../context/cookifyContext'
import CookifyInput from '../cookifyInput'

export const ConsentModal: React.FC = () => {
    const {consentDisplayed, actionAccept, actionNecessary, actionAll} = useCookifyProvider()
    const [displayedClass, setDisplayedClass] = useState('')

    const handleToggle = () => {
        if (consentDisplayed) {
            setDisplayedClass('fixed inset-0 z-10 overflow-y-auto bg-black/30')
        } else {
            setDisplayedClass('hidden')
        }
    }

    useEffect(() => {
        handleToggle()
        console.log('comp. consentDisplayed', consentDisplayed)
    }, [consentDisplayed])

    return (
        <div className={displayedClass}>
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h2 className="text-2xl font-semibold mb-2">Manage Cookies</h2>
                        <p className="mb-4">We use cookies to provide and secure our websites, as well as to analyze the usage of our websites, in order to offer you a great user experience. To learn more about our use of cookies see our <a href="#" target="_blank">Privacy Policy</a>.</p>

                        <div className="font-bold">
                            <CookifyInput type="checkbox" name="necessary" id="necessary2" disabled />
                            <label htmlFor="necessary2">
                                Necessary
                            </label>
                        </div>

                        <div className="font-bold">
                            <CookifyInput type="checkbox" name="marketing" id="marketing2" />
                            <label htmlFor="marketing2">
                                Marketing
                            </label>
                        </div>

                        <div className="font-bold">
                            <CookifyInput type="checkbox" name="performance" id="performance2" />
                            <label htmlFor="performance2">
                                Performance
                            </label>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 flex flex-col sm:flex-row-reverse sm:px-6 gap-3">
                        <button onClick={actionAll} className="inline-flex w-full font-medium justify-center w-fit px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md shadow-md hover:shadow-lg shadow-black/50 hover:shadow-black/50 transition duration-500 text-white">
                            All
                        </button>
                        <button onClick={actionAccept} className="inline-flex w-full font-medium justify-center w-fit px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md shadow-md hover:shadow-lg shadow-black/50 hover:shadow-black/50 transition duration-500 text-white">
                            Accept
                        </button>
                        <button onClick={actionNecessary} className="inline-flex w-full font-medium justify-center w-fit px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md shadow-md hover:shadow-lg shadow-black/50 hover:shadow-black/50 transition duration-500 text-white">
                            Necessary
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConsentModal