import {
    Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestDeleteTask, requestUpdateTask } from '../../Redux/Tasks/actions'
import { getOpenTasks } from '../../Redux/Tasks/selectors'

function TaskForm() {
    const dispatch = useDispatch()

    const allOpenTasks = useSelector(state => getOpenTasks(state))

    function onDelete(id) {
        dispatch(requestDeleteTask(id))
    }

    function onComplete(task) {
        dispatch(requestUpdateTask({ ...task, complete: !task.complete }))
    }

    return (
        <List style = {{ padding: '20px' }}>
            {allOpenTasks.map((task, index) => (
                <ListItem key = {index} role = {undefined} dense button onClick = {() => onComplete(task)}>
                    <ListItemIcon>
                        <Checkbox
                            edge = 'start'
                            checked = {task.complete}
                            disableRipple
                            color = 'secondary'
                        />
                    </ListItemIcon>
                    <ListItemText primary = {task.detail} />
                    <ListItemSecondaryAction>
                        <IconButton edge = 'end' onClick = {() => onDelete(task.id)} color = 'secondary'>
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    )
}

export default TaskForm