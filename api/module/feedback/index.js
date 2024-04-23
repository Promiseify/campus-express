import request from "@/api/request";

// 发布订单
export function createFeedback(data) {
  return request({
    url: "/feedback/",
    method: 'post',
    data: data
  })
}

export function getFeedbackById(data) {
  return request({
    url: "/feedback/" + data,
    method: 'get'
  })
}

export function deleteFeedback(data) {
  return request({
    url: "/feedback/" + data,
    method: 'delete'
  })
}
