import React from 'react'
import { render } from 'tests/test-utils'
import { cleanup } from '@testing-library/react'
import Divider from 'components/Divider'

afterEach(cleanup)

test('renders correctly', () => {
  const { container } = render(<Divider />)
  expect(container.firstChild).toMatchSnapshot()
})
