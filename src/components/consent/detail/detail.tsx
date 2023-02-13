import React from 'react'
import { ConsentDetailProps } from '../../../types'
import Wrapper from './wrapper'
import Header from './header'
import Body from './body/body'
import Footer from './footer'

export const Detail: React.FC<ConsentDetailProps> = ({
	show,
	content,
	table,
	support
}) => {
	return (
		<Wrapper
			className={'fixed inset-0 z-10 bg-black/30 ' + (show ? '' : 'hidden')}
		>
			<Header title={content.title} support={support} />

			<Body desc={content.desc} table={table} reference={content.reference()} />

			<Footer buttons={content.buttons} />
		</Wrapper>
	)
}

export default Detail
