import constants from 'core/types'
import { takeEvery, call, put } from 'redux-saga/effects'
import { BrowserProvider, Contract, formatUnits }  from 'ethers'
import { getContractAddressFromChainId } from 'core/libs/lib-rpc-helpers'

export function* setProvider() {
 
}

export function* setChainId(action) {
  const { chainId } = action

  try {
    let chainId_

    if(chainId) {
      chainId_ = chainId
    } else {
      chainId_ = yield call(window.ethereum.request, { method: "eth_chainId" })    
    }
  
    yield put({
      type: constants.SET_CHAIN_ID,
      payload: { 
        chainId: parseInt(chainId_, 16)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export function* connectMetaMask() {
  if(window && window.ethereum) {
    const metaMaskConnection = yield call(window.ethereum.request, {
      "method": "eth_requestAccounts",
      "params": []
    })
    const metaMaskAccount = metaMaskConnection[0] 
  
    try {
      yield put({
        type: constants.SET_METAMASK_CONNECTION,
        payload: { metaMaskAccount }
      })
      yield put({ type: constants.CLOSE_RIGHT_DRAWER })
    } catch (error) {
      console.log(error)
    }
  } else {
    yield put({ 
      type: constants.DISPLAY_METAMASK_INSTALL_PROMPT,
      payload: { modalKey: 'install-metamask-prompt' }
    })
  }
}

export function* watchProviderActions() {
  yield takeEvery(constants.INIT_PROVIDER, setProvider),
  yield takeEvery(constants.INIT_CHAIN_ID, setChainId)
  yield takeEvery(constants.CONNECT_METAMASK, connectMetaMask)
}
