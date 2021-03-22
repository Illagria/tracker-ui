import React from 'react'
import TaskConstants from '../../Redux/Tasks/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../Utilities/test-utils'
import { TaskForm } from './index'

describe('UpdateTaskPopup', () => {
    const getTasksMock = useModuleMock('Redux/Tasks/selectors', 'getTasks')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const onCompleteMock = useModuleMock('Redux/Tasks/actions', 'requestUpdateTask')
    const onDeleteMock = useModuleMock('Redux/Tasks/actions', 'requestDeleteTask')

    const openTask = [
        {
            userId: 0,
            detail: 'test todo 1',
            id: 1,
            complete: false
        }, {
            userId: 0,
            detail: 'test todo 2',
            id: 2,
            complete: false
        }, {
            userId: 0,
            detail: 'test todo 3',
            id: 2,
            complete: true
        }
    ]

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        getTasksMock.mockReturnValue(openTask)
    })

    test('should renders properly', () => {
        render(<TaskForm />)

        expect(screen.getByText('test todo 1')).toBeInTheDocument()
        expect(screen.getByText('test todo 2')).toBeInTheDocument()
    })

    test('should call update', () => {
        render(<TaskForm />)
        fireEvent.click(screen.getByText('test todo 1'))

        expect(openPopupMock).toHaveBeenCalledWith(TaskConstants.UPDATE_TASK, 'UpdateTaskPopup', { id: 1 })
    })

    test('should call complete', () => {
        render(<TaskForm />)
        fireEvent.click(screen.getByTestId('TaskForm__complete-0'))

        expect(onCompleteMock).toHaveBeenCalledWith({ ...openTask[0], complete: true })
    })

    test('should call delete', () => {
        render(<TaskForm />)
        fireEvent.click(screen.getByTestId('TaskForm__delete-0'))

        expect(onDeleteMock).toHaveBeenCalledWith(1)
    })

})