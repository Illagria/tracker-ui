import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import appLogo from '../../Assets/app-logo.png'
import { fireEvent, render, screen } from '../../Utilities/test-utils'
import { AppBar } from './index'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}))

test('<AppBar /> - links navigate correctly', () => {
    render(
        <MemoryRouter>
            <AppBar appName = 'APP' appLogo = {appLogo} user = {{ id: 1, isAdmin: true }}/>
        </MemoryRouter>
    )

    fireEvent.click(screen.getByTestId('AppBar__img-logo'))
    expect(mockHistoryPush).toHaveBeenCalledWith('/home')

    fireEvent.click(screen.getByText('APP'))
    expect(mockHistoryPush).toHaveBeenCalledWith('/home')
})