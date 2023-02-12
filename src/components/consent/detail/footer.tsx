import React from 'react'
import { ConsentDetailFooterProps, DetailButtonType } from '../../../types'
import { useCookifyProvider } from '../../../context/cookifyContext'

export const Footer: React.FC<ConsentDetailFooterProps> = ({ buttons }) => {
    const {actionAccept, actionNecessary, actionAll} = useCookifyProvider()
    
    return (
        <div className="relative sm:rounded-b-[var(--c-border-radius)] grow-0 bg-[var(--c-bg-secondary-color)] px-4 py-3 sm:px-6 grid gap-3">
            <div className="flex flex-col sm:flex-row-reverse gap-3">
                {buttons.map((button: DetailButtonType, index: number) => {
                    let action, schema

                    switch (button.action) {
                        case 'necessary':
                            action = actionNecessary
                            break

                        case 'accept':
                            action = actionAccept
                            break

                        case 'all':
                            action = actionAll
                            break

                        default:
                            break
                    }

                    if (button.schema == 'week') {
                        schema = 'bg-[var(--c-btn-week-bg-color)] hover:bg-[var(--c-btn-week-bg-hover-color)] text-[var(--c-btn-week-text-color)]'
                    } else if (button.schema == 'strong') {
                        schema = 'bg-[var(--c-btn-strong-bg-color)] hover:bg-[var(--c-btn-strong-bg-hover-color)] text-[var(--c-btn-strong-text-color)]'
                    }

                    return (
                        <button
                            key={index}
                            className={'inline-flex font-medium justify-center sm:w-full px-4 py-2 rounded-[var(--c-btn-border-radius)] transition duration-500 ' + schema}
                            onClick={action}
                        >
                            {button.label}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Footer