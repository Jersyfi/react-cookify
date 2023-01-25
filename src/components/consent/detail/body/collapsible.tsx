import React, { useState } from 'react'
import { ConsentDetailBodyCollapsibleProps } from '../../../../types'
import { CookifyInput } from '../../../input'

export const Collapsible: React.FC<ConsentDetailBodyCollapsibleProps> = ({ type, tableHeaders, typeDefault }) => {
    const [collapse, setCollapse] = useState(false)

    const handleToogleCollapse = () => {
        setCollapse(!collapse)
    }

    return (
        <div className="bg-gray-300 rounded-lg mb-4">
            <div className="bg-gray-400 hover:bg-gray-500 rounded-lg p-3 flex">
                <div onClick={handleToogleCollapse} className="grow font-bold">
                    {type.title}
                </div>

                <div className="grow-0 relative inline-flex items-center cursor-pointer">
                    <CookifyInput
                        className="sr-only peer"
                        type="checkbox"
                        name={type.for}
                        disabled={type.for == typeDefault ? true : false}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </div>
            </div>
            <div className={'grid gap-4 p-3 ' + (collapse ? '' : 'hidden')}>
                <p>{type.description}</p>

                { type.body?.length > 0 && (
                    <table className="w-full">
                        <thead>
                            <tr>
                                {tableHeaders.map((header: string, index: number) => (
                                    <th key={index} scope="col">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {type.body.map((row: any, index: number) => (
                                <tr key={index}>
                                    {row.map((col: string, index: number) => (
                                        <td key={index}>
                                            {col}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Collapsible