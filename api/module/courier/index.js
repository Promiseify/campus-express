import request from "@/api/request";

// 查看代取员身份
export function getCourierById(data) {
  return request({
    url: "/courier/match",
    method: 'get',
    params: data
  })
}

// 更新代取员信息
export function updateCourierById(data) {
  return request({
    url: "/courier/update",
    method: 'post',
    data: data
  })
}

