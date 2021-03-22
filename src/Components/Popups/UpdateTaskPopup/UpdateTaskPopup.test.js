import userEvent from '@testing-library/user-event'
import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock
} from '../../../Utilities/test-utils'
import { UpdateTaskPopup } from './index'


describe('UpdateTaskPopup', () => {
    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitTaskMock = useModuleMock('Redux/Tasks/actions', 'requestUpdateTask')
    const selectRequestErrorsMock = useModuleMock('Redux/Errors/selectors', 'selectRequestErrors')
    const selectTaskByIdMock = useModuleMock('Redux/Tasks/selectors', 'selectTaskById')

    const task = {
        userId: 0,
        detail: 'test todo',
        id: 3
    }

    beforeEach(() => {
        selectTaskByIdMock.mockReturnValue(task)
    })

    test('test component renders properly', () => {
        selectRequestErrorsMock.mockReturnValue([])
        render(<UpdateTaskPopup id = {3} />)

        expect(screen.getByText('Update task')).toBeInTheDocument()
        expect(screen.getByText('test todo')).toBeInTheDocument()
    })

    test('test submit team', () => {
        selectRequestErrorsMock.mockReturnValue([])
        useDispatchMock().mockReturnValue({})
        render(<UpdateTaskPopup id = {3} />)

        const detail = 'watching grass grow'

        const detailInput =  screen.getByRole('textbox')

        userEvent.clear(detailInput)
        userEvent.type(detailInput, detail)
        fireEvent.click(screen.getByText('Submit'))

        expect(submitTaskMock).toHaveBeenCalledTimes(1)
        expect(submitTaskMock.mock.calls[0][0]).toEqual({ ...task, detail })
    })

    test('close popup', () => {
        selectRequestErrorsMock.mockReturnValue([])
        useDispatchMock().mockReturnValue({})
        render(<UpdateTaskPopup id = {3} />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('test error messaging', () => {
        selectRequestErrorsMock.mockReturnValue(['detail error'])
        render(<UpdateTaskPopup id = {3}/>)

        expect(screen.getByText('detail error')).toBeInTheDocument()
    })
})