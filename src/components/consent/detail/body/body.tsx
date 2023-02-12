import React, { useState, useEffect } from 'react'
import { ConsentDetailBodyProps, TableType } from '../../../../types'
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
        <div className="scrollbar grow overflow-y-auto px-4 py-3 sm:px-6">
            <div className="grid gap-6">
                <p>{desc}</p>

                {table.types.length > 0 && (
                    <div className="grid gap-3">{
                        table.types.map((type: TableType, index: number) => (
                            <Collapsible
                                key={index}
                                type={type}
                                tableHeaders={table.headers}
                                typeDefault={table.typeDefault}
                            />
                        ))
                    }</div>
                )}

                {typeof reference == 'object' && (
                    <div className="border-2 border-[var(--c-ref-border-color)] rounded-[var(--c-ref-border-radius)] p-3">
                        <p className="mb-3">{reference.desc}</p>
                        
                        <p><b>{reference.uuid}:</b> {consentObject.uuid}</p>
                        <p><b>{reference.accepted}:</b> {at.created}</p>
                        <p><b>{reference.updated}:</b> {at.updated}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Body