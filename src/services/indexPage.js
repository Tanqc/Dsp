import request from '../utils/request';

// 余额
export function fetchBalance() {
  return request(`/dsp/finance/self/get`);
}

// 广告主
export function fetchAdvert() {
  return request(`/dsp/account/advert/statInfo`);
}

// 代理商
export function fetchAgent() {
  return request(`/dsp/ad/plan/agent/statInfo`);
}

// 广告数据
export function fetchStatistics({ payload }) {
  return request(`/dsp/statistics/agent/feePerDay?data=${payload}`);
}

// 当前账户信息
export function fetch() {
  return request(`/dsp/account/info`);
}

// 账户切换
export function switchUser({ payload }) {
	return request(`/dsp/switch/user?data=${payload}`)
}

 // 退出
export function logout() {
  return request(`/public/logout.action`);
}