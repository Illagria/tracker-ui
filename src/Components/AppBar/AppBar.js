import { AppBar as AppBarMUI, IconButton, makeStyles, Toolbar, Typography, useTheme } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearTasks } from '../../Redux/Tasks/reducer'
import { clearSession, getEmail } from '../../Utilities/sessions'

const useStyles = makeStyles(theme => ({
    logo: {
        maxBlockSize: '36px',
        paddingRight: '5px',
        cursor: 'pointer'
    },
    title: {
        display: 'none',
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    }
}))

function AppBar({ height, appColor, appName, appLogo }) {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const theme = useTheme()

    const email = getEmail()

    const goHome = () => history.push('/home')
    const onExit = () => {
        clearSession()
        dispatch(clearTasks())
        history.push('/login')
    }

    return (
        <AppBarMUI
            style = {{
                marginTop: '20px',
                height: height,
                justifyContent: 'center',
                boxShadow: 'none',
                borderBottom: `solid 1px ${appColor}`,
                backgroundColor: '#24292e'
            }}
        >
            <Toolbar style = {{ paddingLeft: '10px' }}>
                {appLogo &&
                    <img
                        src = {appLogo}
                        alt = 'app logo'
                        data-testid = 'AppBar__img-logo'
                        className = {classes.logo}
                        onClick = {goHome}
                    />
                }
                {appName &&
                    <Typography
                        variant = 'h4'
                        className = {classes.title}
                        color = 'textPrimary'
                        onClick = {goHome}
                    >
                        {appName}
                    </Typography>
                }
                <div style = {{ flexGrow: 1 }} />
                {email &&
                    <>
                        <Typography color = 'textSecondary'>{email}</Typography>
                        <IconButton
                            edge = 'end'
                            color = 'default'
                            data-testid = 'AppBar__icon-exit'
                            style = {{ color: theme.palette.error.light }}
                            onClick = {onExit}
                        >
                            <ExitToApp />
                        </IconButton>
                    </>
                }
            </Toolbar>
        </AppBarMUI>
    )
}

AppBar.propTypes = {
    height: PropTypes.string,
    appName: PropTypes.string,
    appColor: PropTypes.string,
    appLogo: PropTypes.string,
    user: PropTypes.shape({
        id: PropTypes.number,
        isAdmin: PropTypes.bool
    })
}

AppBar.defaultProps = {
    height: '48px',
    appName: null,
    appColor: 'gray',
    appLogo: null,
    user: {
        id: null,
        isAdmin: false
    }
}

export default AppBar