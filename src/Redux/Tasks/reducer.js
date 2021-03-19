import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {},
    reducers: {},
    extraReducers: {
        [actions.requestGetTasksByUserId.fulfilled]: (state, action) => {
            action.payload.forEach(task => {
                state[task.id] = task
            })
        },
        [actions.requestCreateTask.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestUpdateTask.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload
        },
        [actions.requestDeleteTask.fulfilled]: (state, action) => {
            state = delete state[action.payload.id]
        }
    }
})

export default tasksSlice.reducer