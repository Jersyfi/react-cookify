import React from 'react'
import { ConsentInfoWrapperProps } from '../../../types'

export const Wrapper: React.FC<ConsentInfoWrapperProps> = ({
	children,
	...rest
}) => {
	return (
		<div {...rest}>
			<div className="fixed inset-x-3 sm:inset-x-5 bottom-3 sm:bottom-5 bg-[var(--c-bg-primary-color)] max-w-sm mr-auto shadow-lg border-2 border-[var(--c-border-color)] rounded-[var(--c-border-radius)] w-fit">
				<div className="px-4 py-3 grid gap-6 items-center text-[var(--c-text-color)]">
					{children}
				</div>
			</div>
		</div>
	)
}

export default Wrapper
