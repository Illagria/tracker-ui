import * as selectors from './selectors'

test('should return empty array', () => {
    const openTasks = selectors.getTasks({ tasks: [] })
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
            },
            2: {
                detail: 'Todo 3',
                complete: false
            },
            4: {
                detail: 'Todo 4',
                complete: true
            },
        }
    }

    const openTasks = selectors.getTasks(mockState)

    expect(openTasks.length).toEqual(4)
    expect(openTasks[2]).toEqual(mockState.tasks[0])
})

test('should return empty object', () => {
    expect(selectors.selectTaskById({ tasks: {} }, 0)).toBeInstanceOf(Object)
})

test('should return empty object', () => {
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
    expect(selectors.selectTaskById(mockState, 1)).toEqual(mockState.tasks[1])
})