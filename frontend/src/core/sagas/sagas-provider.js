import constants from 'core/types'
import { takeEvery, put } from 'redux-saga/effects'
import { VoidSigner } from 'ethers'
import { getRpcUrl } from 'core/libs/lib-rpc-helpers'
import { getRetryProvider } from 'core/hocs/hoc-retry-provider'
import { AddressZero } from 'ethers/constants'

export function* setProvider(action) {
  const { networkId } = action
  const rpc = getRpcUrl(networkId)
  const rpcProvider = getRetryProvider(DEFAULT_RPC_RETRIES, rpc)
  const voidSigner = new VoidSigner(AddressZero, rpcProvider)

  try {
    yield put({
      type: constants.SET_PROVIDERS
    })

  } catch (error) {

    yield put({
      type: constants.SET_PROVIDER_ERROR,
      payload: { error: error.toString() }
    })
  }
}

export function* watchProviderActions() {
  yield takeEvery(constants.INIT_PROVIDER, setProvider)
}
