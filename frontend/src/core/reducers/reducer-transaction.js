import constants from 'core/types'

const initialState = {
  transactionStatus: null,
  transactionProcessingMsg: '',
  showLoader: false
}

export function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case constants.MINT_TOKENS_MSG:
      return Object.assign({}, state, {
        transactionProcessingMsg: action.payload.transactionProcessingMsg
      })

    case constants.MINT_TOKENS_TX:
      return Object.assign({}, state, {
        transactionStatus: action.payload.transactionStatus,
        transactionProcessingMsg: action.payload.transactionProcessingMsg,
        showLoader: action.payload.showLoader
      })

    case constants.CHANGE_CONTRACT_OWNER_MSG:
      return Object.assign({}, state, {
        transactionProcessingMsg: action.payload.transactionProcessingMsg
      })

    case constants.CHANGE_CONTRACT_OWNER_TX:
      return Object.assign({}, state, {
        transactionStatus: action.payload.transactionStatus,
        transactionProcessingMsg: action.payload.transactionProcessingMsg,
        showLoader: action.payload.showLoader
      })

    default:
      return state
  }
}

export default transactionReducer

