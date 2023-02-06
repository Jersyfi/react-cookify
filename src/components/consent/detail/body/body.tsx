import React, { useState, useEffect } from 'react'
import { ConsentDetailBodyProps } from '../../../../types'
import { useCookifyProvider } from '../../../../context/cookifyContext'
import Collapsible from './collapsible'

export const Body: React.FC<ConsentDetailBodyProps> = ({ desc, table, reference }) => {
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
            <div className="grid gap-6">
                <p>{desc}</p>

                {table.types.length > 0 && (
                    <div className="grid gap-3">{
                        table.types.map((type: any, index: number) => (
                            <Collapsible
                                key={index}
                                type={type}
                                tableHeaders={table.headers}
                                typeDefault={table.typeDefault}
                            />
                        ))
                    }</div>
                )}

                {reference !== false && (
                    <div className="border-2 rounded-[var(--c-body-border-radius)] p-3">
                        <p className="mb-3">{reference}</p>
                        
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