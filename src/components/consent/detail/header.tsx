import React from 'react'
import { ConsentDetailHeaderProps } from '../../../types'
import Support from '../support'

export const Header: React.FC<ConsentDetailHeaderProps> = ({ title }) => {
    return (
        <div className="sm:rounded-t-[var(--c-border-radius)] grow-0 bg-[var(--c-bg-secondary-color)] px-4 py-3 sm:px-6 border-b-2 border-[var(--c-border-color)]">
            <h2 className="text-2xl font-semibold text-[var(--c-text-title-color)]">{title}</h2>
            <Support display={true} />
        </div>
    )
}

export default Header