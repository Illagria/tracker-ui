import React from 'react'
import { render, screen, useSelectorMock, waitFor } from '../../Utilities/test-utils'
import { PopupManager } from './index'

beforeEach(async() => {
    useSelectorMock().mockReturnValue([])
})

test('<PopupManger /> - initializes', async() => {
    render(<PopupManager />)

    await waitFor(() => expect(screen.queryByTestId('PopupManager__wrap-fallback')).not.toBeInTheDocument())
})

test('<PopupManger /> - rendered component', async() => {
    useSelectorMock().mockReturnValue([{
        componentName: 'CreateTaskPopup',
        name: 'test/popup',
        open: true,
        props: { userId: 0 }
    }])

    render(<PopupManager />)

    await waitFor(() => screen.findByTestId('PopupManager__wrap-fallback'))
    expect(screen.getByText('Add a new task')).toBeInTheDocument()
})

test('<PopupManger /> - checks props', async() => {
    useSelectorMock().mockReturnValueOnce([{
        componentName: 'CreateTaskPopup',
        name: 'test/popup',
        open: true,
        props: { userId: 0 }
    }])

    useSelectorMock().mockReturnValueOnce([{
        componentName: 'CreateTaskPopup',
        name: 'test/popupDiff',
        open: true,
        props: { userId: 0 }
    }])

    render(<PopupManager />)

    await waitFor(() => screen.findByTestId('PopupManager__wrap-fallback'))
    expect(screen.getByText('Add a new task')).toBeInTheDocument()
})

test('<PopupManger /> - no dups same popup', async() => {
    useSelectorMock().mockReturnValueOnce([{
        componentName: 'CreateTaskPopup',
        name: 'test/popup',
        open: true,
        props: { userId: 0 }
    }])

    useSelectorMock().mockReturnValueOnce([{
        componentName: 'CreateTaskPopup',
        name: 'test/popup',
        open: true,
        props: { userId: 0 }
    }])

    render(<PopupManager />)

    await waitFor(() => screen.findByTestId('PopupManager__wrap-fallback'))
    expect(screen.getAllByText('Add a new task')).toHaveLength(1)
})