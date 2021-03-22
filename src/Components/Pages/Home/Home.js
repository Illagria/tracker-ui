import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import { requestGetTasksByUserId } from '../../../Redux/Tasks/actions'
import TaskConstants from '../../../Redux/Tasks/constants'
import { requestFetchUserByEmail } from '../../../Redux/User/actions'
import { getEmail } from '../../../Utilities/sessions'
import Page from '../../Page/Page'
import { TaskForm } from '../../TaskForm'

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
    const dispatch = useDispatch()
    const sessionEmail = getEmail()

    const user = useSelector(state => state.user)

    const addTask = () => {
        dispatch(openPopup(TaskConstants.CREATE_TASK, 'CreateTaskPopup', { userId: user.id }))
    }

    useEffect(() => {
        async function fetchTasks() {
            user.id > 0 && dispatch(requestGetTasksByUserId(user.id))
        }
        fetchTasks()
    }, [user, dispatch])

    useEffect(() => {
        if (user.id === undefined && sessionEmail) {
            dispatch(requestFetchUserByEmail(sessionEmail))
        }
    }, [])

    return (
        <Page>
            <Box display = 'flex' flexDirection = 'column' style = {{ margin: '0px 150px' }}>
                <div style = {{ display: 'flex' }}>
                    <Typography variant = 'h6' color = 'textSecondary' style = {{ padding: '20px' }}>
                        {'Keeping track of things so you don\'t have to'}
                    </Typography>
                    <div style = {{ flexGrow: 1 }} />
                    <div style = {{ padding: '20px' }}>
                        <Button
                            variant = 'text'
                            startIcon = {<Add/>}
                            className = {classes.button}
                            onClick = {addTask}
                        >
                            Add New Task
                        </Button>
                    </div>
                </div>
                <TaskForm/>
            </Box>
        </Page>
    )
}

export default Home