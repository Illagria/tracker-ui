import { IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Delete, Done } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../Redux/Popups/actions'
import { requestDeleteTask, requestUpdateTask } from '../../Redux/Tasks/actions'
import TaskConstants from '../../Redux/Tasks/constants'
import { getOpenTasks } from '../../Redux/Tasks/selectors'

function TaskForm() {
    const dispatch = useDispatch()

    const allOpenTasks = useSelector(state => getOpenTasks(state))

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
            {allOpenTasks.map((task, index) => (
                <ListItem key = {index} role = {undefined} dense button>
                    <ListItemIcon>
                        <IconButton
                            edge = 'start'
                            onClick = {() => onComplete(task)}
                            color = 'primary'
                            data-testid = {`TaskForm__complete-${index}`}
                        >
                            <Done/>
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText primary = {task.detail} onClick = {() => onUpdate(task.id)} />
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