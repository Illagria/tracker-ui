import userEvent from '@testing-library/user-event'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, waitFor } from '../../../Utilities/test-utils'
import { Login } from './index'

describe('<Login />', () => {

    const getEmailMock = useModuleMock('Utilities/sessions', 'getEmail')
    const mockHistoryPush = jest.fn()

    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useHistory: () => ({
            push: mockHistoryPush,
        })
    }))

    test('continue button goes home', async() => {
        useDispatchMock().mockReturnValue({ payload: { email: 'test' } })
        getEmailMock.mockReturnValue(null)

        render(<MemoryRouter><Login /></MemoryRouter>)
        const inputField = screen.getByRole('textbox')

        fireEvent.click(inputField)
        userEvent.type(inputField, 'test')
        fireEvent.click(screen.getByText(/CONTINUE/i))

        waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/home'))
    })

    test('continue button failed', async() => {
        useDispatchMock().mockReturnValue({ payload: { } })
        getEmailMock.mockReturnValue(null)

        render(<MemoryRouter><Login /></MemoryRouter>)
        const inputField = screen.getByRole('textbox')

        fireEvent.click(inputField)
        userEvent.type(inputField, 'test')
        fireEvent.click(screen.getByText(/CONTINUE/i))

        waitFor(() => expect(mockHistoryPush).not.toHaveBeenCalled())
    })

    test('already logged in', async() => {
        const getEmailMock = useModuleMock('Utilities/sessions', 'getEmail')
        getEmailMock.mockReturnValue('test')

        useDispatchMock().mockReturnValue({ payload: { } })

        render(<MemoryRouter><Login /></MemoryRouter>)

        waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/home'))
    })

    test('should handle error display', async() => {
        useDispatchMock().mockReturnValue(null)
        getEmailMock.mockReturnValue(null)

        render(<MemoryRouter><Login /></MemoryRouter>)
        const inputField = screen.getByRole('textbox')

        fireEvent.click(screen.getByText(/CONTINUE/i))

        expect(screen.getByText('cannot be empty')).toBeInTheDocument()

        fireEvent.click(inputField)
        userEvent.type(inputField, 'test')

        expect(screen.queryByText('cannot be empty')).not.toBeInTheDocument()
    })
})