import { all } from 'redux-saga/effects'
import { watchProviderActions } from './sagas-provider'

export default function* rootSaga() {
  yield all([
    watchProviderActions()
  ])
}
