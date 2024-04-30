import request from "@/api/request";

// 钱包金额减少
export function getAllUsers(data) {
  return request({
    url: "/user/",
    method: 'get'
  })
}

export function updateUser(data) {
  return request({
    url: "/user/update",
    method: 'post',
    data
  })
}