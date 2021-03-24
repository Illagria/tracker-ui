import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, waitFor } from '../../../Utilities/test-utils'
import { Home } from './index'

describe('<Home />', () => {

    const getEmailMock = useModuleMock('Utilities/sessions', 'getEmail')
    const mockHistoryPush = jest.fn()

    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useHistory: () => ({
            push: mockHistoryPush,
        })
    }))

    test('Has correct text', () => {
        useDispatchMock().mockReturnValue({})
        getEmailMock.mockReturnValue('test')

        const mockState = {
            user: {
                id: 1
            },
            tasks: []
        }
        render(<MemoryRouter><Home /></MemoryRouter>, { initialState: mockState })

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
        render(<MemoryRouter><Home /></MemoryRouter>, { initialState: mockState })

        fireEvent.click(screen.getByText(/Add new task/i))

        expect(screen.getByText(/Add new task/i)).toBeInTheDocument()
    })

    test('Unauthenticated user redirected to login', async() => {
        useDispatchMock().mockReturnValue({})
        getEmailMock.mockReturnValue(undefined)

        const mockState = {
            user: {
            },
            tasks: []
        }
        render(<MemoryRouter><Home /></MemoryRouter>, { initialState: mockState })

        waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/login'))
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