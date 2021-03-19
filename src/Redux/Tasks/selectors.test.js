import * as selectors from './selectors'

test('should return empty array', () => {
    const openTasks = selectors.getOpenTasks({ tasks: [] })
    expect(openTasks.length).toEqual(0)
})

test('should return array of size 1', () => {
    const mockState = {
        tasks: {
            0: {
                detail: 'Todo 1',
                complete: true
            },
            1: {
                detail: 'Todo 2',
                complete: false
            }
        }
    }

    const openTasks = selectors.getOpenTasks(mockState)
    expect(openTasks.length).toEqual(1)
})
