import { getStorage } from './cookies'

const BASE_URL = 'https://service-white-gragon.ascetic.top'
// const BASE_URL = 'http://xw7sg3.natappfree.cc'
// const BASE_URL = 'http://he2jqq.natappfree.cc'
 // const BASE_URL = 'http://8756nf.natappfree.cc'
export const request = (options) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: BASE_URL + options.url,
            method: options.method || 'GET',
            data: options.data || {},
            success: (res) => {
                if (res.data.code === 1) { // 正常
                    return resolve(res.data)
                }
                if (res.data.code === -1) { // 未登录
                    uni.navigateTo({
                        url: '/pages/login/login'
                    })
                }
                return reject(res.data)
            },
            fail: (err) => {
                uni.$u.toast(err.message)
                reject(err)
            },
            header: {
                Authorized: '950bf3dd-8ff4-4e55-a4e9-840b0dfe8e30'
            }
        })
    })
}


export function uploadUrl(url) {
  return BASE_URL + url;
}
