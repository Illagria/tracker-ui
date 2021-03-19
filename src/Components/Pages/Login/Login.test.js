import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Login } from './index'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}))

test('<Login /> - Has correct header', () => {
    render(<Login />)
    const linkElement = screen.getByText(/Login/i)
    expect(linkElement).toBeInTheDocument()
})

test('<Login /> - Login button', () => {

    render(<MemoryRouter><Login /></MemoryRouter>)
    fireEvent.click(screen.getByText(/CONTINUE WITH KEYCLOAK/i))
    expect(mockHistoryPush).toHaveBeenCalledWith('/home')
})

