import React from 'react'
import { ConsentDetailHeaderProps } from '../../../types'

export const Header: React.FC<ConsentDetailHeaderProps> = ({ title }) => {
    return (
        <div className="grow-0 bg-gray-100 px-4 py-3 sm:px-6 border-b">
            <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
    )
}

export default Header