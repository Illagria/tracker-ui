import * as reduxActions from './actions'
import reducer from './reducer'

const mockStore = {
    0: {
        id: 0,
        detail: 'singular',
        isComplete: false
    },
    1: {
        id: 1,
        detail: 'singular',
        isComplete: true
    }
}

test('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
})

test('should create task', () => {
    const response = {
        id: 3,
        isComplete: true,
        detail: 'Task 1'
    }

    const actions = [{ type: reduxActions.requestCreateTask.fulfilled, payload: response }]
    const state = actions.reduce(reducer, mockStore)

    expect(state[3]).toEqual(response)
})

test('should update task', () => {
    const response = {
        id: 0,
        isComplete: true,
        detail: 'Task 1'
    }

    const actions = [{ type: reduxActions.requestUpdateTask.fulfilled, payload: response }]
    const state = actions.reduce(reducer, mockStore)

    expect(state[0]).toEqual(response)
})

test('set tasks by userId', () => {
    const response = [
        {
            id: 3,
            isComplete: false,
            detail: 'Task 1'
        }, {
            id: 4,
            isComplete: false,
            detail: 'Task 2'
        }
    ]

    const actions = [{ type: reduxActions.requestGetTasksByUserId.fulfilled, payload: response }]
    const state = actions.reduce(reducer, {})

    expect(state[3]).toEqual(response[0])
    expect(state[4]).toEqual(response[1])
})

test('should delete task from state', () => {

    const actions = [{ type: reduxActions.requestDeleteTask.fulfilled, payload: { id: 0 } }]
    const state = actions.reduce(reducer, mockStore)

    expect(state).toEqual({
        1: {
            id: 1,
            detail: 'singular',
            isComplete: true
        }
    })
})
