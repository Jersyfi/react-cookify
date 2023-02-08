import React from 'react'
import { ConsentPausedProps } from '../../types'

export const Pause: React.FC<ConsentPausedProps> = ({icon, title, desc}) => {    
    return (
        <div className="fixed inset-x-3 sm:inset-x-5 bottom-3 sm:bottom-5 bg-[var(--c-bg-primary-color)] max-w-sm mr-auto shadow-lg border-2 border-[var(--c-border-color)] rounded-[var(--c-border-radius)] w-fit">
            <div className="px-4 py-3 flex gap-3 items-center text-[var(--c-text-color)]">
                <p className="text-2xl">{icon}</p>
                <div>
                    <p className="text-xl font-semibold">{title}</p>
                    <p>{desc}</p>
                </div>
            </div>
        </div>
    )
}

export default Pause