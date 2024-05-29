import constants from 'core/types'

export function mintTokens(toAddress, amount, showLoader) {
  return {
    type: constants.MINT_TOKENS,
    toAddress,
    amount,
    showLoader
  }
}

export function changeContractOwner(newOwner, showLoader) {
  return {
    type: constants.CHANGE_CONTRACT_OWNER,
    newOwner,
    showLoader
  }
}
