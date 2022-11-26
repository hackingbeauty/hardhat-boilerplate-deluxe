import React from 'react'
import { render } from 'tests/test-utils'
import { cleanup } from '@testing-library/react'
import Drawer from 'components/Drawer'

afterEach(cleanup)

test('renders correctly', () => {
  const { container } = render(
    <Drawer>
      <span>Lend Order</span>
    </Drawer>
  )
  expect(container.firstChild).toMatchSnapshot()
})
