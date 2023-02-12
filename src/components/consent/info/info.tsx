import React from 'react'
import { ConsentInfoProps } from '../../../types'
import Support from '../support'
import Wrapper from './wrapper'
import Buttons from './buttons'

export const Info: React.FC<ConsentInfoProps> = ({
	show,
	force,
	content,
	openManage,
	support
}) => {
	return (
		<Wrapper
			className={
				(force && 'fixed inset-0 z-10 bg-black/30') + (show ? '' : ' hidden')
			}
		>
			<div>
				<p className="text-2xl font-semibold mb-1 text-[var(--c-text-title-color)]">
					{content.title}
				</p>
				<Support display={support} />
			</div>

			<p>{content.desc}</p>

			<Buttons buttons={content.buttons} openManage={openManage} />
		</Wrapper>
	)
}

export default Info
