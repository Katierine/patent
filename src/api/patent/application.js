import request from '@/utils/request'

// 查询 内部申请列表
export function listApplication(query) {
  return request({
    url: '/patent/application/list',
    method: 'get',
    params: query
  })
}

// 查询 内部申请 详细信息
export function getApplication(applicationId) {
  return request({
    url: '/patent/application' + applicationId,
    method: 'get'
  })
}

// 新增 内部申请
export function addApplication(data) {
  return request({
    url: '/patent/application',
    method: 'put',
    data: data
  })
}

// 修改 内部申请
export function updateApplication(data) {
  return request({
    url: '/patent/application/',
    method: 'put',
    data: data
  })
}



// 删除 内部申请
export function delApplication(applicationId) {
  return request({
    url: '/patent/application/' + applicationId,
    method: 'delete'
  })
}
