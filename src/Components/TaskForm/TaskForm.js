import { IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import { CheckBoxOutlineBlankRounded, CheckBoxOutlined, Delete } from '@material-ui/icons'
import clsx from 'clsx'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../Redux/Popups/actions'
import { requestDeleteTask, requestUpdateTask } from '../../Redux/Tasks/actions'
import TaskConstants from '../../Redux/Tasks/constants'
import { getTasks } from '../../Redux/Tasks/selectors'

const useStyles = makeStyles(theme => ({
    taskOpen: {
        color: theme.palette.text.primary
    },
    taskComplete: {
        color: theme.palette.text.secondary,
        textDecoration: 'line-through'
    }
}))

function TaskForm() {
    const dispatch = useDispatch()
    const classes = useStyles()

    const allTasks = useSelector(getTasks)

    function onDelete(id) {
        dispatch(requestDeleteTask(id))
    }

    function onUpdate(id) {
        dispatch(openPopup(TaskConstants.UPDATE_TASK, 'UpdateTaskPopup', { id }))
    }

    function onComplete(task) {
        dispatch(requestUpdateTask({ ...task, complete: !task.complete }))
    }

    return (
        <List style = {{ padding: '20px' }}>
            {allTasks.map((task, index) => (
                <ListItem key = {index} role = {undefined} dense button>
                    <ListItemIcon>
                        <IconButton
                            edge = 'start'
                            onClick = {() => onComplete(task)}
                            color = 'primary'
                            data-testid = {`TaskForm__complete-${index}`}
                        >
                            { task.complete ? <CheckBoxOutlined/> : <CheckBoxOutlineBlankRounded /> }
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText
                        className = {clsx(classes.drawer, {
                            [classes.taskOpen]: !task.complete,
                            [classes.taskComplete]: task.complete
                        })}
                        primary = {task.detail}
                        onClick = {() => onUpdate(task.id)}
                    />
                    <ListItemIcon>
                        <IconButton
                            edge = 'end'
                            onClick = {() => onDelete(task.id)}
                            color = 'secondary'
                            data-testid = {`TaskForm__delete-${index}`}
                        >
                            <Delete />
                        </IconButton>
                    </ListItemIcon>
                </ListItem>
            ))}
        </List>
    )
}

export default TaskForm