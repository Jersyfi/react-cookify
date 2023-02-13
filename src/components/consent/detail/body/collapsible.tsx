import React, { useState } from 'react'
import {
	ConsentDetailBodyCollapsibleProps,
	TableRowType
} from '../../../../types'
import IconChevronUpSolid from '../../../../icons/chevronUpSolid'
import IconChevronDownSolid from '../../../../icons/chevronDownSolid'
import { Input } from '../../../input'

export const Collapsible: React.FC<ConsentDetailBodyCollapsibleProps> = ({
	type,
	tableHeaders,
	typeDefault
}) => {
	const [collapse, setCollapse] = useState(false)
	const _this = {
		body: type.body || []
	}

	const handleToogleCollapse = () => {
		setCollapse(!collapse)
	}

	const checkIfDisabled = () => {
		return type.for == typeDefault ? true : false
	}

	return (
		<div className="overflow-hidden">
			<div className="bg-[var(--c-c-bar-bg-color)] hover:bg-[var(--c-c-bar-bg-hover-color)] rounded-[var(--c-c-bar-border-radius)] p-3 flex gap-3">
				<div
					onClick={handleToogleCollapse}
					className="flex items-center gap-1 mr-auto font-bold cursor-pointer text-[var(--c-c-bar-text-color)]"
				>
					<span className="inline-block w-3.5 fill-[var(--c-c-bar-text-color)]">
						{collapse ? <IconChevronUpSolid /> : <IconChevronDownSolid />}
					</span>
					{type.title}
					{_this.body?.length > 0 && (
						<span className="inline-block relative bg-[var(--c-c-bar-badge-bg-color)] rounded-[var(--c-c-bar-badge-border-radius)] px-2 py-0.5 text-xs text-[var(--c-c-bar-badge-text-color)] font-bold leading-4">
							{_this.body.length}
						</span>
					)}
				</div>

				<label
					className={
						'grow-0 relative inline-flex items-center ' +
						(checkIfDisabled() ? 'cursor-not-allowed' : 'cursor-pointer')
					}
				>
					<Input
						className="sr-only peer"
						type="checkbox"
						name={type.for}
						disabled={checkIfDisabled()}
					/>
					<div className="relative w-11 h-6 bg-[var(--c-c-bar-toggle-off-color)] rounded-full peer-focus:ring-4 peer-focus:ring-[var(--c-c-bar-toggle-ring-color)] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[var(--c-c-bar-toggle-knob-color)] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--c-c-bar-toggle-on-color)] peer-disabled:opacity-50"></div>
				</label>
			</div>
			<div
				className={
					'px-[var(--c-c-extend-padding)] ' + (collapse ? '' : 'hidden')
				}
			>
				<div className="bg-[var(--c-c-extend-bg-color)] rounded-b-[var(--c-c-extend-border-radius)] border-x-2 border-b-2 border-[var(--c-c-extend-border-color)] overflow-hidden text-[var(--c-c-extend-text-color)]">
					<div className="p-3">
						<p>{type.desc}</p>
					</div>

					{_this.body?.length > 0 && (
						<div className="">
							<table className="w-full border-t-2 border-[var(--c-c-extend-border-color)]">
								<thead>
									<tr className="max-md:hidden border-b-2 border-[var(--c-c-extend-border-color)] bg-[var(--c-c-extend-table-bg-header-color)]">
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
									{_this.body.map((row: TableRowType, index: number) => (
										<tr
											key={index}
											className={
												'max-md:px-3 max-md:py-2 max-md:flex max-md:flex-col max-md:gap-1 hover:bg-[var(--c-c-extend-table-bg-hover-color)] border-[var(--c-c-extend-border-color)] ' +
												(index + 1 < _this.body.length ? 'border-b-2' : '')
											}
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
