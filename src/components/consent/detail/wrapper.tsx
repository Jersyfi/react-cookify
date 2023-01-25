import React from 'react'
import { ConsentDetailWrapperProps } from '../../../types'

export const Wrapper: React.FC<ConsentDetailWrapperProps> = ({ children, ...rest }) => {
    return (
        <div {...rest}>
            <div className="flex min-h-full items-end justify-center text-center sm:items-center">
                <div className="relative flex flex-col h-screen sm:h-fit sm:max-h-[32rem] w-screen sm:w-fit sm:max-w-xl md:max-w-2xl transform overflow-hidden sm:rounded-lg bg-white text-left shadow-2xl transition-all sm:my-8">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Wrapper