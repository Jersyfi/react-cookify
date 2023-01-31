import React from 'react'
import { ConsentPausedProps } from '../../types'

export const Pause: React.FC<ConsentPausedProps> = ({icon, title, description}) => {    
    return (
        <div className="fixed inset-x-3 sm:inset-x-5 bottom-3 sm:bottom-5 bg-white max-w-sm mr-auto shadow-lg border-2 rounded-lg w-fit">
            <div className="px-3 py-2 flex gap-3 items-center">
                <div className="text-2xl">{icon}</div>
                <div>
                    <p className="text-xl font-semibold">{title}</p>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default Pause