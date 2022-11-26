import React from 'react'
import { render } from 'tests/test-utils'
import { cleanup } from '@testing-library/react'
import Button from 'components/AppBar'

afterEach(cleanup)

test('renders correctly', () => {
  const { container } = render(<Button />)
  expect(container.firstChild).toMatchSnapshot()
})
