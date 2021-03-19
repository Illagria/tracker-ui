import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {},
    extraReducers: {
        [actions.requestFetchUserByEmail.fulfilled]: (_state, action) => {
            return action.payload
        }
    }
})

export default userSlice.reducer