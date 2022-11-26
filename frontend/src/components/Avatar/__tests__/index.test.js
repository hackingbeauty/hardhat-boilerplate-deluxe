import React from 'react'
import { render } from 'tests/test-utils'
import { cleanup } from '@testing-library/react'
import Avatar from 'components/Avatar'

afterEach(cleanup)

test('renders correctly', () => {
  const { container } = render(<Avatar />)
  expect(container.firstChild).toMatchSnapshot()
})
