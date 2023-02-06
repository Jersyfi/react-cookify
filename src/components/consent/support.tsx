import React from 'react'
import { SupportPorps } from '../../types'

export const Support: React.FC<SupportPorps> = ({display}) => {
    if (!display) {
        return null
    }

    return (
        <div className="text-sm mt-1 text-[var(--c-text-support)]">
            Powered by <a className="font-bold" href="#">Cookify</a>
        </div>
    )
}

export default Support