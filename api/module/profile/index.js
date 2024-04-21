import request from "@/api/request";

// 发布订单
export function updateUserById(data) {
  return request({
    url: "/user/update",
    method: 'post',
    data
  })
}

export function getUserById(data) {
  return request({
    url: "/user/" + data,
    method: 'get'
  })
}