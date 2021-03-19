import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React from 'react'
import Page from '../../Page/Page'

const useStyles = makeStyles(theme => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40
    }
}))

function Home() {
    const classes = useStyles()

    return (
        <Page>
            <Box display = 'flex'>
                <Typography variant = 'h6' color = 'textSecondary' style = {{ padding: '20px' }}>
                    {'Keeping track of things so you don\'t have to'}
                </Typography>
                <div style = {{ flexGrow: 1 }} />
                <div style = {{ padding: '20px' }}>
                    <Button
                        variant = 'text'
                        startIcon = {<Add/>}
                        className = {classes.button}
                        onClick = {() => console.log('Add Todo')}
                    >
                        Add New ToDo
                    </Button>
                </div>
            </Box>
        </Page>
    )
}

export default Home