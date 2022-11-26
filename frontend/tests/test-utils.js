/* eslint react/prop-types: 0 */
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from 'core/store/configureStore'
import { IntlProvider } from 'react-intl'
import usEnglishTranslation from 'configs/i18n/lang/english.json'

const store = configureStore()
const locale = 'en-US'
const languageTranslation = usEnglishTranslation

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <IntlProvider
        locale={locale}
        defaultLocale="en"
        messages={languageTranslation}
      >
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  )
}

const customRender = (ui, options) =>
  render(
    ui,
    {
      wrapper: AllTheProviders,
      ...options
    }
  )

// export Redux store
export { store }

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
