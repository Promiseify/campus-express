import request from "@/api/request";

// 发布订单
export function issueOrder(data) {
  return request({
    url: "/order/",
    method: 'post',
    data: data
  })
}