import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from '../../Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

describe('Tasks actions', () => {
    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestCreateTask : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateTask({ details: 'this is a new task' }))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/tasks')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ details: 'this is a new task' })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateTask.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateTask.fulfilled.toString())
    })

    test('requestCreateTask : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateTask({ details: 'this is a new task' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateTask.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateTask.rejected.toString())
    })

    test('requestUpdateTask : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateTask({ id: 1, details: 'this is a new task' }))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/tasks/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ details: 'this is a new task' })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateTask.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateTask.fulfilled.toString())
    })

    test('requestUpdateTask : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateTask({ id: 1, details: 'this is a new task' }))

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateTask.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateTask.rejected.toString())
    })

    test('requestGetTasksByUserId : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestGetTasksByUserId(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/tasks?search=user.id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestGetTasksByUserId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetTasksByUserId.fulfilled.toString())
    })

    test('requestGetTasksByUserId : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestGetTasksByUserId(1))

        expect(store.getActions()[0].type).toEqual(actions.requestGetTasksByUserId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetTasksByUserId.rejected.toString())
    })

    test('requestDeleteTask : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        const data = await store.dispatch(actions.requestDeleteTask(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/tasks/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteTask.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteTask.fulfilled.toString())
        expect(data.payload).toEqual({ id: 1 })
    })

    test('requestDeleteTask : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteTask(1))

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteTask.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteTask.rejected.toString())
    })
})
