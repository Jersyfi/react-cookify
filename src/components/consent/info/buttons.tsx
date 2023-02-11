import React from 'react'
import { ConsentInfoButtonsProps } from '../../../types'
import { useCookifyProvider } from '../../../context/cookifyContext'

export const Buttons: React.FC<ConsentInfoButtonsProps> = ({ buttons, openManage }) => {
    const {actionNecessary, actionAccept, actionAll} = useCookifyProvider()

    return (
        <div className="flex flex-col gap-3">
            {buttons.map((button: any, index: number) => {
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

                    case 'manage':
                    default:
                        action = openManage
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
    )
}

export default Buttons