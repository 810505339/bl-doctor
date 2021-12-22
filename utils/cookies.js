const token = 'token'

export const setStorage = (data) => {
  uni.setStorageSync(token, data)
}

export const getStorage = () => {
  return uni.getStorageSync(token)
}

export const clearStorage = () => {
  uni.clearStorageSync()
}
