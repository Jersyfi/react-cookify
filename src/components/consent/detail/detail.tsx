import React from 'react'
import { ConsentDetailProps } from '../../../types'
import Wrapper from './wrapper'
import Header from './header'
import Body from './body/body'
import Footer from './footer'

export const Detail: React.FC<ConsentDetailProps> = ({ show, label, table, support, reference }) => {
    return (
        <Wrapper className={'fixed inset-0 z-10 bg-black/30 ' + (show ? '' : 'hidden')}>
            <Header
                title={label.title}
                support={support}
            />

            <Body
                desc={label.desc}
                table={table}
                reference={reference}
            />

            <Footer />
        </Wrapper>
    )
}

export default Detail