import React from 'react'
import { ConsentDetailWrapperProps } from '../../../types'

export const Wrapper: React.FC<ConsentDetailWrapperProps> = ({
	children,
	...rest
}) => {
	return (
		<div {...rest}>
			<div className="flex min-h-full items-end justify-center text-center sm:items-center">
				<div className="flex flex-col h-screen sm:max-h-[36rem] w-screen sm:w-fit sm:max-w-xl md:max-w-2xl lg:max-w-3xl transform sm:border-2 border-[var(--c-border-color)] sm:rounded-[var(--c-border-radius)] bg-[var(--c-bg-primary-color)] text-[var(--c-text-color)] text-left shadow-2xl transition-all sm:my-8">
					{children}
				</div>
			</div>
		</div>
	)
}

export default Wrapper
