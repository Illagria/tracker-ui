import { createSlice } from '@reduxjs/toolkit'
import { requestFetchAppInit } from './actions'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        classification: {}
    },
    reducers: {},
    extraReducers: {
        [requestFetchAppInit.fulfilled]: (_state, action) => {
            return action.payload
        }
    }
})

export default appSlice.reducer