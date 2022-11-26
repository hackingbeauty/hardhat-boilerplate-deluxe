import React from 'react'
import { render } from 'tests/test-utils'
import { cleanup } from '@testing-library/react'
import Header from 'components/Header'

afterEach(cleanup)

const props = {
  actions: jest.fn(),
  logo: 'logo.svg',
  navLinks: [
    {
      label: <div />,
      link: '/portfolio',
      iconImg: '/6fb1979778a4870242b32a2ad672350a.svg'
    }
  ],
  wallet: {}
}

test('renders correctly', () => {
  const { container } = render(
    <Header
      layout="app"
      logo={props.logo}
      navLinks={props.navLinks}
    />
  )
  expect(container.firstChild).toMatchSnapshot()
})
