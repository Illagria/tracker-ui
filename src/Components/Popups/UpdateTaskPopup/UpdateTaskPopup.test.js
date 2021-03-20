import userEvent from '@testing-library/user-event'
import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, useSelectorMock
} from '../../../Utilities/test-utils'
import { UpdateTaskPopup } from './index'


describe('UpdateTaskPopup', () => {
    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitTaskMock = useModuleMock('Redux/Tasks/actions', 'requestUpdateTask')

    const task = {
        userId: 0,
        detail: 'test todo',
        id: 3
    }

    beforeEach(() => {
        useSelectorMock().mockReturnValue(task)
    })

    test('test component renders properly', () => {
        render(<UpdateTaskPopup id = {3} />)

        expect(screen.getByText('Update task')).toBeInTheDocument()
        expect(screen.getByText('test todo')).toBeInTheDocument()
    })

    test('test submit team', () => {
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
        useDispatchMock().mockReturnValue({})
        render(<UpdateTaskPopup id = {3} />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })
})