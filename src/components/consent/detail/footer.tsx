import React from 'react'
import { useCookifyProvider } from '../../../context/cookifyContext'

export const Footer: React.FC = () => {
    const {actionAccept, actionNecessary, actionAll} = useCookifyProvider()
    
    return (
        <div className="relative sm:rounded-b-[var(--c-border-radius)] grow-0 bg-[var(--c-bg-secondary)] px-4 py-3 sm:px-6 grid gap-3 border-t-2 border-[var(--c-border)]">
            <div className="flex flex-col sm:flex-row-reverse gap-3">
                <button onClick={actionAll} className="inline-flex font-medium justify-center sm:w-full px-4 py-2 bg-[var(--c-btn-strong-bg)] hover:bg-[var(--c-btn-strong-bg)]\80 rounded-[var(--c-btn-border-radius)] transition duration-500 text-[var(--c-btn-strong-text)]">
                    All
                </button>
                <button onClick={actionAccept} className="inline-flex font-medium justify-center sm:w-full px-4 py-2 bg-[var(--c-btn-week-bg)] hover:bg-[var(--c-btn-week-bg)]\80 rounded-[var(--c-btn-border-radius)] transition duration-500 text-[var(--c-btn-week-text)]">
                    Accept
                </button>
                <button onClick={actionNecessary} className="inline-flex font-medium justify-center sm:w-full px-4 py-2 bg-[var(--c-btn-week-bg)] hover:bg-[var(--c-btn-week-bg)]\80 rounded-[var(--c-btn-border-radius)] shadow-md transition duration-500 text-[var(--c-btn-week-text)]">
                    Necessary
                </button>
            </div>
        </div>
    )
}

export default Footer