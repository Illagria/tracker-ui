import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { Home } from './index'

describe('<Home />', () => {

    test('Has correct text', () => {
        useDispatchMock().mockReturnValue({})
        const mockState = {
            user: {
                id: 1
            },
            tasks: []
        }
        render(<Home />, { initialState: mockState })

        expect(screen.getByText('Keeping track of things so you don\'t have to')).toBeInTheDocument()
    })

    test('Can add Task', () => {
        useDispatchMock().mockReturnValue({})
        const mockState = {
            user: {
                id: 1
            },
            tasks: []
        }
        render(<Home />, { initialState: mockState })

        fireEvent.click(screen.getByText(/Add new task/i))

        expect(screen.getByText(/Add new task/i)).toBeInTheDocument()
    })

    test('Redirect to login', () => {
        const getEmailMock = useModuleMock('Utilities/sessions', 'getEmail')
        const requestFetchUserByEmailMock = useModuleMock('Redux/User/actions', 'requestFetchUserByEmail')
        getEmailMock.mockReturnValue('test')
        useDispatchMock().mockReturnValue({})

        render(<Home />, { initialState: { user: {} } })

        expect(requestFetchUserByEmailMock).toHaveBeenCalledTimes(1)
    })
})