import request from '../utils/request';

export function fetch({ payload }) {
  return request(`/dsp/agent/collaborative/account/list?data=${payload}`);
}

export function enable({ enableParams }) {
  return request(`/dsp/agent/employee/enable?data=${enableParams}`);
}

export function disable({ disableParams }) {
  return request(`/dsp/agent/employee/disable?data=${disableParams}`);
}

export function del({ delParams }) {
	return request(`/dsp/agent/employee/delete?data=${delParams}`)
}

export function create({ payload }) {
	return request(`/dsp/agent/employee/add?data=${payload}`)
}