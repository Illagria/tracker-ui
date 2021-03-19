import * as reduxActions from './actions'
import reducer from './reducer'

const mockStore = {
    user: {},
    classification: {}
}
test('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
})

test('should set user', () => {
    const response = {
        id: 1,
        email: 'test@foo.bar'
    }

    const actions = [{ type: reduxActions.requestFetchUserByEmail.fulfilled, payload: response }]
    const state = actions.reduce(reducer, mockStore)

    expect(state).toEqual(response)
})
