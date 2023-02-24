import React from 'react'
import { ConsentSupportPorps } from '../../types'

export const Support: React.FC<ConsentSupportPorps> = ({ display }) => {
	if (!display) {
		return null
	}

	return (
		<div className="text-sm mt-1 text-[var(--c-text-by-color)]">
			Powered by{' '}
			<a className="font-bold" href="https://cookify.jersyfi.dev">
				Cookify
			</a>
		</div>
	)
}

export default Support
