import request from '../utils/request';

// 操作员
export function fetchOperator() {
  return request(`/dsp/agent/operator/list`)
}

export function fetch({ payload }) {
  return request(`/dsp/advertiser/detail?data=${payload}`);
}

export function submit({ payload }) {
  return request(`/dsp/advertiser/update?data=${payload}`);
}