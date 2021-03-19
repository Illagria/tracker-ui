import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from '../../Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

describe('User actions', () => {
    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestFetchUserByEmail : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchUserByEmail('a@b.c'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/users/email')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ email: 'a@b.c' })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchUserByEmail.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchUserByEmail.fulfilled.toString())
    })

    test('requestFetchUserByEmail : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchUserByEmail('a@b.c'))

        expect(store.getActions()[0].type).toEqual(actions.requestFetchUserByEmail.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchUserByEmail.rejected.toString())
    })
})
