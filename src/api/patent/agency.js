import request from '@/utils/request'

// 查询专利管理单位列表
export function listAgency(query) {
  return request({
    url: '/patent/agency/list',
    method: 'get',
    params: query
  })
}

// 查询专利管理单位详细信息
export function getAgency(AgencyId) {
  return request({
    url: '/patent/agency' + AgencyId,
    method: 'get'
  })
}

// 新增专利管理单位
export function addAgency(data) {
  return request({
    url: '/patent/agency',
    method: 'post',
    data: data
  })
}

// 修改专利管理单位
export function updateAgency(data) {
  return request({
    url: '/patent/agency',
    method: 'put',
    data: data
  })
}

// 删除专利管理单位
export function delAgency(AgencyId) {
  return request({
    url: '/patent/agency' + AgencyId,
    method: 'delete'
  })
}
