import request from "@/api/request";

// 发布订单
export function createFeedback(data) {
  return request({
    url: "/feedback/",
    method: 'post',
    data: data
  })
}
