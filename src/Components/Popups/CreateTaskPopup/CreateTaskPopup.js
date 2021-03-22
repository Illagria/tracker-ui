import { Box, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useEnterSubmit from '../../../Hooks/useEnterSubmit'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestCreateTask } from '../../../Redux/Tasks/actions'
import TaskConstants from '../../../Redux/Tasks/constants'
import Popup from '../../Popup/Popup'

function CreateTaskPopup({ userId }) {
    const dispatch = useDispatch()

    const errors = useSelector(state => selectRequestErrors(state, TaskConstants.CREATE_TASK))

    const [detail, setDetail] = useState('')
    const [detailError, setDetailError] = useState([])

    const onDetailChange = (e) => setDetail(e.target.value)

    const onClose = () => {
        dispatch(closePopup(TaskConstants.CREATE_TASK))
    }

    const onSubmit = () => {
        dispatch(requestCreateTask({
            userId,
            detail
        }))
    }

    useEffect(() => {
        if (errors.length > 0) {
            setDetailError(errors.filter(error => error.includes('detail')))
        }
    }, [errors])

    useEnterSubmit(onSubmit)

    return (
        <Popup
            title = 'Add a new task'
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' style = {{ flexDirection: 'column' }}>
                <TextField
                    label = 'Task'
                    data-testid = 'CreateTaskPopup__input-detail'
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

CreateTaskPopup.propTypes = {
    userId: PropTypes.number.isRequired
}

export default CreateTaskPopup