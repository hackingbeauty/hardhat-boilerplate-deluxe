import React from 'react'
import { render } from 'tests/test-utils'
import { cleanup } from '@testing-library/react'
import AppBar from 'components/AppBar'

afterEach(cleanup)

test('renders correctly', () => {
  const { container } = render(
    <AppBar elevation={1} position="static">
      <div>Hello World</div>
    </AppBar>
  )
  expect(container.firstChild).toMatchSnapshot()
})
