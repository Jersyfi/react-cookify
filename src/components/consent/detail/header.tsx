import React from 'react'
import { ConsentDetailHeaderProps } from '../../../types'
import Support from '../support'

export const Header: React.FC<ConsentDetailHeaderProps> = ({ title }) => {
    return (
        <div className="sm:rounded-t-lg grow-0 bg-gray-100 px-4 py-3 sm:px-6 border-b-2">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <Support display={true} />
        </div>
    )
}

export default Header