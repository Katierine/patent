import request from '@/utils/request'

// 查询专利列表
export function listPatent(query) {
  return request({
    url: '/patent/patent/list',
    method: 'get',
    params: query
  })
}

// 查询专利详细信息
export function getPatent(PatentId) {
  return request({
    url: '/patent/patent' + PatentId,
    method: 'get'
  })
}

// 新增专利
export function addPatent(data) {
  return request({
    url: '/patent/patent',
    method: 'put',
    data: data
  })
}

// 修改专利
export function updatePatent(data) {
  return request({
    url: '/patent/patent',
    method: 'put',
    data: data
  })
}

// 删除专利
export function delPatent(patentId) {
  return request({
    url: '/patent/patent/' + patentId,
    method: 'delete'
  })
}

