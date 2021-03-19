/* eslint-disable react/display-name */
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { render, screen, useDispatchMock } from './Utilities/test-utils'

jest.mock('./Components/PopupManager/PopupManager', () => () => (<div/>))

test('<App /> - Has correct text', () => {
    useDispatchMock().mockReturnValue({ payload: [{}] })

    render(<MemoryRouter><App /></MemoryRouter>)

    expect(screen.getByText(/Tracker/i)).toBeInTheDocument()
})