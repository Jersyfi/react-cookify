import React from 'react'
import { ConsentDetailFooterProps } from '../../../types'
import { useCookifyProvider } from '../../../context/cookifyContext'
import Support from '../support'

export const Footer: React.FC<ConsentDetailFooterProps> = ({ support }) => {
    const {actionAccept, actionNecessary, actionAll} = useCookifyProvider()
    
    return (
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

            <Support display={support} />
        </div>
    )
}

export default Footer