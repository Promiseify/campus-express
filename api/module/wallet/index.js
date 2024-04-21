import request from "@/api/request";

// 钱包金额减少
export function decreaseWallet(data) {
  return request({
    url: "/wallet/decrease",
    method: 'post',
    params: data
  })
}

// 钱包金额增加
export function increaseWallet(data) {
  return request({
    url: "/wallet/increase",
    method: 'post',
    params: data
  })
}