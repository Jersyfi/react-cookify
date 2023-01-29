import React, { useState, useEffect } from 'react'
import { ConsentDetailBodyProps } from '../../../../types'
import { useCookifyProvider } from '../../../../context/cookifyContext'
import Collapsible from './collapsible'

export const Body: React.FC<ConsentDetailBodyProps> = ({ description, table, reference }) => {
    const {consentObject} = useCookifyProvider()
    const [at, setAt] = useState({
        created: '',
        updated: ''
    })

    useEffect(() => {
        setAt({
            created: new Date(consentObject.created_at).toUTCString(),
            updated: new Date(consentObject.updated_at).toUTCString()
        })
    }, [consentObject])

    return (
        <div className="grow overflow-y-auto px-4 py-3 sm:px-6">
            <div className="grid gap-4">
                <p>{description}</p>

                {table.types.map((type: any, index: number) => (
                    <Collapsible
                        key={index}
                        type={type}
                        tableHeaders={table.headers}
                        typeDefault={table.typeDefault}
                    />
                ))}

                {reference && (
                    <div className="border-2 rounded-lg p-3">
                        <p className="mb-3">Please provide the below information when you hand in a request about cookies.</p>
                        <p><b>UUID:</b> {consentObject.uuid}</p>
                        <p><b>Accepted:</b> {at.created}</p>
                        <p><b>Updated:</b> {at.updated}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Body