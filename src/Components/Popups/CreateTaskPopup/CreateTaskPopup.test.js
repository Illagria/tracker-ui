import userEvent from '@testing-library/user-event'
import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, within } from '../../../Utilities/test-utils'
import { CreateTaskPopup } from './index'


describe('CreateTaskPopup', () => {
    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitTaskMock = useModuleMock('Redux/Tasks/actions', 'requestCreateTask')

    test('<CreateTaskPopup /> - test component renders properly', () => {
        render(<CreateTaskPopup userId = {0}/>)

        expect(screen.getByText('Add a new task')).toBeInTheDocument()
        expect(screen.getByTestId('CreateTaskPopup__input-detail')).toBeInTheDocument()
    })

    test('<CreateTaskPopup /> - test submit team',  () => {
        useDispatchMock().mockReturnValue({})
        render(<CreateTaskPopup userId = {0}/>)

        const detail = 'My New Task'

        const detailInput =  within(screen.getByTestId('CreateTaskPopup__input-detail'))
            .getByRole('textbox')

        userEvent.type(detailInput, detail)
        fireEvent.click(screen.getByText('Submit'))

        expect(submitTaskMock).toHaveBeenCalledTimes(1)
        expect(submitTaskMock.mock.calls[0][0]).toEqual({ detail, userId: 0 })
    })

    test('close popup', () => {
        useDispatchMock().mockReturnValue({})
        render(<CreateTaskPopup userId = {0}/>)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('test error messaging', () => {
        const state = {
            errors: {
                'task/create': [
                    'detail error'
                ]
            }
        }
        render(<CreateTaskPopup userId = {0}/>, { initialState: state })

        expect(screen.getByText('detail error')).toBeInTheDocument()
    })
})