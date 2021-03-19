import React from 'react'
import { render, screen } from '../../Utilities/test-utils'
import { Page } from './index'

test('<Page> - renders', () => {
    render(<Page><div>This is a test</div></Page>)

    expect(screen.getByText(/This is a test/i)).toBeInTheDocument()
})
