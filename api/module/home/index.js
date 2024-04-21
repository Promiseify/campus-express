import request from "@/api/request";

// 发布订单
export function getWalletByUserId(data) {
  return request({
    url: "/wallet/" + data,
    method: 'get'
  })
}
