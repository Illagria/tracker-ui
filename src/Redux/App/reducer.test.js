import * as reduxActions from './actions'
import reducer from './reducer'

const mockStore = {
    classification: {}
}
test('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        classification: {}
    })
})

test('sets init info', () => {
    const initResponse = {
        classification: {
            backgroundColor: 'purple',
            textColor: 'white',
            label: 'UNCLASSIFIED',
            caveats: 'IL2'
        }
    }

    const actions = [{ type: reduxActions.requestFetchAppInit.fulfilled, payload: initResponse }]
    const state = actions.reduce(reducer, mockStore)

    expect(state).toEqual(initResponse)
})
