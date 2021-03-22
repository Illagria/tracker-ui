import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleThunkRequest } from '../../Utilities/requests'
import Constants from './constants'

export const requestCreateTask = createAsyncThunk(
    Constants.CREATE_TASK,
    async(task, { rejectWithValue }) => {
        const request = { endpoint: '/api/tasks', method: 'POST', body: task }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestGetTasksByUserId = createAsyncThunk(
    Constants.GET_TASKS_BY_USER,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/tasks?search=user.id:${id}`, method: 'GET', body: { } }
        return handleThunkRequest(request, rejectWithValue)
    }
)

export const requestDeleteTask = createAsyncThunk(
    Constants.DELETE_TASK,
    async(id, { rejectWithValue }) => {
        const request = { endpoint: `/api/tasks/${id}`, method: 'DELETE', body: {} }
        const data = await handleThunkRequest(request, rejectWithValue)
        return { ...data, id }
    }
)

export const requestUpdateTask = createAsyncThunk(
    Constants.UPDATE_TASK,
    async(task, { rejectWithValue }) => {
        const { id, ...body } = task
        const request = { endpoint: `/api/tasks/${id}`, method: 'PUT', body }
        return handleThunkRequest(request, rejectWithValue)
    }
)
