import { Button, Card, CardActions, CardContent, CardHeader, Grid, makeStyles, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { requestFetchUserByEmail } from '../../../Redux/User/actions'
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
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)

    const helperText = 'cannot be empty'

    function goHome() {
        if (!error && email.length > 0) {
            dispatch(requestFetchUserByEmail(email))
            history.push('/home')
        } else {
            setError(true)
        }
    }

    function onChangeEmail({ target }) {
        setEmail(target.value)
        if (target.value.length > 0 && error) setError(false)
    }

    return (
        <Page>
            <Grid className = {classes.root} justify = 'center' container = {true}>
                <Card
                    className = {classes.card}
                    raised
                >
                    <CardHeader title = 'Email'/>
                    <CardContent display = 'flex' width = '400px'>
                        <TextField
                            label = 'email'
                            variant = 'outlined'
                            value = {email}
                            error = {error}
                            helperText = {error && helperText}
                            onChange = {onChangeEmail}
                        />
                    </CardContent>
                    <CardActions style = {{ direction: 'rtl' }}>
                        <Button
                            variant = 'outlined'
                            color = 'primary'
                            size = 'medium'
                            onClick = {goHome}
                        >Continue</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Page>
    )
}

export default Login
