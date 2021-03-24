
import React from 'react'
import { render, screen, useSelectorMock, waitFor } from '../../Utilities/test-utils'
import { PopupManager } from './index'

jest.mock('../Popups/CreateTaskPopup/CreateTaskPopup',
    () => function testfn() { return (<div>PopupManagerTest</div>) })

describe('PopupManager', () => {

    beforeEach(async() => {
        useSelectorMock().mockReturnValue([])
    })

    test('initializes', async() => {
        render(<PopupManager />)

        await waitFor(() => expect(screen.queryByTestId('PopupManager__wrap-fallback')).not.toBeInTheDocument())
    })

    test('rendered component', async() => {

        useSelectorMock().mockReturnValue([{
            componentName: 'CreateTaskPopup',
            name: 'test/popup',
            open: true,
            props: { userId: 0 }
        }])

        render(<PopupManager />)

        await waitFor(() => screen.findByTestId('PopupManager__wrap-fallback'))
        expect(screen.getByText('PopupManagerTest')).toBeInTheDocument()
    })

    test('checks props', async() => {
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
        expect(screen.getByText('PopupManagerTest')).toBeInTheDocument()
    })

    test('no dups same popup', async() => {
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
        expect(screen.getAllByText('PopupManagerTest')).toHaveLength(1)
    })
})