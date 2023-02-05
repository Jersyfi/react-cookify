import React, { useState } from 'react'
import IconChevronUpSolid from '../../../../icons/chevronUpSolid'
import IconChevronDownSolid from '../../../../icons/chevronDownSolid'
import { ConsentDetailBodyCollapsibleProps } from '../../../../types'
import { Input } from '../../../input'

export const Collapsible: React.FC<ConsentDetailBodyCollapsibleProps> = ({ type, tableHeaders, typeDefault }) => {
    const [collapse, setCollapse] = useState(false)

    const handleToogleCollapse = () => {
        setCollapse(!collapse)
    }

    const checkIfDisabled = () => {
        return type.for == typeDefault ? true : false
    }

    return (
        <div className="overflow-hidden">
            <div className="bg-gray-300 hover:bg-gray-400/60 rounded-lg p-3 flex gap-3">
                <div onClick={handleToogleCollapse} className="flex items-center gap-1 mr-auto font-bold cursor-pointer">
                    <span className="inline-block w-3.5">
                        {collapse ? <IconChevronUpSolid /> : <IconChevronDownSolid />}
                    </span>
                    {type.title}
                    {type.body?.length > 0 && (
                        <span className="inline-block relative bg-blue-600 rounded-lg px-2 py-0.5 text-xs font-bold leading-4">{type.body.length}</span>
                    )}
                </div>

                <label className={'grow-0 relative inline-flex items-center ' + (checkIfDisabled() ? 'cursor-not-allowed' : 'cursor-pointer')}>
                    <Input
                        className="sr-only peer"
                        type="checkbox"
                        name={type.for}
                        disabled={checkIfDisabled()}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                </label>
            </div>
            <div className={'px-2 ' + (collapse ? '' : 'hidden')}>
                <div className="bg-gray-200/50 rounded-b-lg border-x-2 border-b-2 overflow-hidden">
                    <div className="p-3">
                        <p>{type.description}</p>
                    </div>

                    {type.body?.length > 0 && (
                        <div className="">
                            <table className="w-full max-md:border-t">
                                <thead>
                                    <tr className="max-md:hidden border-b bg-gray-300/50">
                                        {tableHeaders.map((header: string, index: number) => (
                                            <th
                                                key={index}
                                                scope="col"
                                                className="px-3 py-2 whitespace-nowrap"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {type.body.map((row: any, index: number) => (
                                        <tr
                                            key={index}
                                            className={'max-md:px-3 max-md:py-2 max-md:flex max-md:flex-col max-md:gap-1 hover:bg-gray-300/20 ' + ((index + 1) < type.body.length ? 'border-b-2' : '')}
                                        >
                                            {row.map((col: string, index: number) => (
                                                <td
                                                    key={index}
                                                    className="max-md:flex max-md:flex-row md:px-3 md:py-2 whitespace-nowrap"
                                                >
                                                    <span className="max-md:w-2/6 md:hidden font-medium">
                                                        {tableHeaders[index] || '?'}
                                                    </span>
                                                    <span className="max-md:w-4/6 whitespace-pre-wrap">
                                                        {col}
                                                    </span>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Collapsible