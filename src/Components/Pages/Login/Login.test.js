import userEvent from '@testing-library/user-event'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen, useDispatchMock } from '../../../Utilities/test-utils'
import { Login } from './index'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}))

test('<Login /> - continue button', () => {
    useDispatchMock().mockReturnValue({ payload: [{}] })

    render(<MemoryRouter><Login /></MemoryRouter>)
    const inputField = screen.getByRole('textbox')

    fireEvent.click(inputField)
    userEvent.type(inputField, 'test')
    fireEvent.click(screen.getByText(/CONTINUE/i))

    expect(mockHistoryPush).toHaveBeenCalledWith('/home')
})

test('<Login /> - should handle error display', () => {
    useDispatchMock().mockReturnValue({ payload: [{}] })

    render(<MemoryRouter><Login /></MemoryRouter>)
    const inputField = screen.getByRole('textbox')

    fireEvent.click(screen.getByText(/CONTINUE/i))

    expect(screen.getByText('cannot be empty')).toBeInTheDocument()

    fireEvent.click(inputField)
    userEvent.type(inputField, 'test')

    expect(screen.queryByText('cannot be empty')).not.toBeInTheDocument()
})