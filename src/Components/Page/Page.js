import PropTypes from 'prop-types'
import React from 'react'
import appLogo from '../../Assets/app-logo.png'
import { AppBar } from '../AppBar'

function Page({ children }) {

    return (
        <>
            <AppBar
                appColor = '#00aad5' //'#e91d2d'
                appLogo = {appLogo}
                appName = 'Tracker'
            />
            <div
                data-testid = 'Page__content'
                style = {{ padding: '68px 0 20px 0' }}
            >
                {children}
            </div>
        </>
    )
}

Page.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]).isRequired
}

export default Page