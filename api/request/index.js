import { API_URL, TIME_OUT } from "@/service/config"

let timeout = TIME_OUT

const request = config => {
  // get请求映射params参数
  if (config.params) {
    let url = config.url + '?' + handleParams(config.params)
    url = url.slice(0, -1)
    config.url = url
  }

  return new Promise((resolve, reject) => {
    uni.request({
      method: config.method || 'get',
      timeout: config.timeout || timeout,
      url: config.API_URL || API_URL + config.url,
      data: config.data,
      header: config.header,
      dataType: 'json'
    }).then(res => {
      let [error, res] = res
      if (error) {
        uni.showToast({ title: '后端接口连接异常!' })
        reject('后端接口连接异常!')
        return;
      }
      if (res.code == 404) {
        uni.showToast({ title: res.msg })
        reject('404!')
        return;
      }
      const code = res.code || 200
      const msg = res.msg

      if (code === 401) {
        uni.showModal({
          title: '提示',
          content: '登录状态已过期，您可以继续留在该页面，或者重新登录?',
          success: function (res) {
            if (res.confirm) {
              uni.reLaunch({ url: '/pages/login/index' })
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
        reject('无效的会话，或者会话已过期，请重新登录!')
      } else if (code !== 200) {
        uni.showToast({ title: msg })
        reject(code)
      }
      resolve(res.data)
    }).catch(err => {
      const { msg } = err
      if (msg === 'Network Error') {
        msg = '后端接口连接异常'
      } else if (msg.includes('timeout')) {
        msg = '系统接口请求超时'
      } else if (msg.includes('Request failed with status code')) {
        msg = '系统接口' + msg.substr(msg.length - 3) + '异常'
      }
      uni.hideLoading()
      uni.showToast({ title: msg })
      reject(err)
    })
  })
}

export default request


// 参数处理函数
function handleParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + "="
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + "="
            result += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&"
      }
    }
  }
  return result
}