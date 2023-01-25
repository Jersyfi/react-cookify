import React from 'react'
import { ConsentDetailBodyProps } from '../../../../types'
import Collapsible from './collapsible'

export const Body: React.FC<ConsentDetailBodyProps> = ({ description, table }) => {
    return (
        <div className="grow overflow-y-auto px-4 py-3 sm:px-6">
            <p className="mb-4">{description}</p>

            {table.types.map((type: any, index: number) => (
                <Collapsible
                    key={index}
                    type={type}
                    tableHeaders={table.headers}
                    typeDefault={table.typeDefault}
                />
            ))}
        </div>
    )
}

export default Body