import { Box, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useEnterSubmit from '../../../Hooks/useEnterSubmit'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestUpdateTask } from '../../../Redux/Tasks/actions'
import TaskConstants from '../../../Redux/Tasks/constants'
import { selectTaskById } from '../../../Redux/Tasks/selectors'
import Popup from '../../Popup/Popup'

function UpdateTaskPopup({ id }) {
    const dispatch = useDispatch()

    const errors = useSelector(state => selectRequestErrors(state, TaskConstants.UPDATE_TASK))
    const task = useSelector(state => selectTaskById(state, id))

    const [detail, setDetail] = useState('')
    const [detailError, setDetailError] = useState([])

    const onDetailChange = (e) => setDetail(e.target.value)

    const onClose = () => {
        dispatch(closePopup(TaskConstants.UPDATE_TASK))
    }

    const onSubmit = () => {
        dispatch(requestUpdateTask({
            ...task,
            detail
        }))
    }

    useEffect(() => {
        setDetail(task.detail)
    }, [task])

    useEffect(() => {
        if (errors.length > 0) {
            setDetailError(errors.filter(error => error.includes('detail')))
        }
    }, [errors])

    useEnterSubmit(onSubmit)

    return (
        <Popup
            title = 'Update task'
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' style = {{ flexDirection: 'column' }}>
                <TextField
                    label = 'Task'
                    value = {detail}
                    onChange = {onDetailChange}
                    error = { detailError.length > 0 }
                    helperText = { detailError[0] ?? '' }
                    margin = 'dense'
                    required
                    multiline
                />
            </Box>
        </Popup>
    )
}

UpdateTaskPopup.propTypes = {
    id: PropTypes.number.isRequired
}

export default UpdateTaskPopup