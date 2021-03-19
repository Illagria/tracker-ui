import { createSlice } from '@reduxjs/toolkit'
import { requestFetchAppInit } from './actions'

const appSettingsSlice = createSlice({
    name: 'app',
    initialState: {
        classification: {},
        user: {}
    },
    reducers: {},
    extraReducers: {
        [requestFetchAppInit.fulfilled]: (state, action) => {
            state.classification = action.payload.classification
        }
    }
})

export default appSettingsSlice.reducer