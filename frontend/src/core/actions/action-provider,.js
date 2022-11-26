import constants from 'core/types'

export function setProviderAndSDKs(networkId) {
  return {
    type: constants.INIT_PROVIDER_AND_SDKS,
    networkId
  }
}
