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

// 接取订单
export function updateOrderById(data) {
  return request({
    url: "/order/update",
    method: 'post',
    data: data
  })
}

// 根据id删除订单
export function deleteOrderById(data) {
  return request({
    url: "/order/" + data,
    method: 'delete'
  })
}

export function getAllOrderStatus(data) {
  return request({
    url: "/orderStatus/",
    method: 'get',
    params: data
  })
}

export function getAllOrderType(data) {
  return request({
    url: "/orderTypes/",
    method: 'get',
    params: data
  })
}