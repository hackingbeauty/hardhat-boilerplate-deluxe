import React from 'react'
import { render } from 'tests/test-utils'
import { cleanup } from '@testing-library/react'
import Footer from 'components/Footer'

afterEach(cleanup)

test('renders correctly', () => {
  const { container } = render(<Footer />)
  expect(container.firstChild).toMatchSnapshot()
})
