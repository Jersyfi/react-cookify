import React, { useEffect, useState } from 'react'
import { ConsentModalProps } from '../../../types'
import { useCookifyProvider } from '../../../context/cookifyContext'
import Wrapper from './wrapper'
import Header from './header'
import Body from './body/body'
import Footer from './footer'

export const Detail: React.FC<ConsentModalProps> = ({ label, table, support, reference }) => {
    const {consentDisplayed} = useCookifyProvider()
    /*const [displayed, setDisplayed] = useState()

    const handleToggleDisplayed = () => {
        setDisplayed(!displayed)
    }

    useEffect(() => {
        handleToggle()
    }, [consentDisplayed])*/

    return (
        <Wrapper className={'fixed inset-0 z-10 overflow-y-auto bg-black/30 ' + (consentDisplayed ? '' : 'hidden')}>
            <Header
                title={label.title}
            />

            <Body
                description={label.description}
                table={table}
                reference={reference}
            />

            <Footer
                support={support}
            />
        </Wrapper>
    )
}

export default Detail