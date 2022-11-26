import constants from 'core/types'

const initialState = {
  web3provider: null
}

export function providerReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_PROVIDER:
      return Object.assign({}, state, {
        web3provider: action.payload.web3provider
      })

    default:
      return state
  }
}
