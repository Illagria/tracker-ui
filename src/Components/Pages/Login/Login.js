import { Button, Card, CardActions, CardContent, CardHeader, Grid, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Page from '../../Page/Page'

const useStyles = makeStyles({
    root: {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
    },
    card: {
        maxWidth: '400px'
    }
})

function Login() {
    const classes = useStyles()
    const history = useHistory()

    const goHome = () => {
        console.log('check backend, set user, redirect to home')
        history.push('/home')
    }

    return (
        <Page>
            <Grid className={classes.root} justify='center' container={true}>
                <Card
                    className={classes.card}
                    raised
                >
                    <CardHeader title='Email'/>
                    <CardContent display='flex' width='400px'>
                        <TextField label='email' variant = 'outlined'/>
                    </CardContent>
                    <CardActions style={{ direction: 'rtl' }}>
                        <Button
                            variant='outlined'
                            color='primary'
                            size='medium'
                            onClick={goHome}
                        >Continue</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Page>
    )
}

export default Login
