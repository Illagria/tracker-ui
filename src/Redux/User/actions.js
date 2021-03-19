import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from '../../Utilities/requests'
import Constants from './constants'

export const requestFetchUserByEmail = createAsyncThunk(
    Constants.FETCH_USER,
    async(email, { rejectWithValue }) => {
        const request = { endpoint: '/api/users/email', method: 'PUT', body: { email } }
        return handleThunkRequest(request, rejectWithValue)
    }
)
