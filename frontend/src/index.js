import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from 'core/store/configureStore'
import { IntlProvider } from 'react-intl'
import { getLanguageTranslation } from 'core/libs/lib-i18n-helpers'
import constants from 'core/types'
import App from 'containers/App'

async function appInit() {
  const store = configureStore()
  const locale = navigator.language
  const languageTranslation = await getLanguageTranslation(locale)

  store.dispatch({
    type: constants.LOCALE,
    locale,
    currentLocaleTranslation: languageTranslation
  })

  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider
        locale={locale}
        defaultLocale="en"
        messages={languageTranslation}
      >
        <App />
      </IntlProvider>
    </Provider>,
    document.getElementById('root')
  )
}

appInit()
