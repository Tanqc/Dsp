import request from '../utils/request';
// 初始化
export function fetch() {
  return request(`/dsp/account/info`);
}
// 账户切换
export function switchUser({ payload }) {
	return request(`/dsp/switch/user?data=${payload}`)
}

export function logout() {
  return request(`/public/logout.action`);
}