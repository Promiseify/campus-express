import request from "@/api/request";

// 发布订单
export function issueOrder(data) {
  return request({
    url: "/order/",
    method: 'post',
    data: data
  })
}

// 查询订单
export function getOrders(data) {
  return request({
    url: "/order/match",
    method: 'get',
    params: data
  })
}