import request from '../utils/request';

// 操作员
export function fetchOperator() {
  return request(`/dsp/agent/operator/list`)
}

// 表单提交
export function submit({ payload }) {
  return request(`/dsp/advertiser/add?data=${payload}`)
}