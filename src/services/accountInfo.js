import request from '../utils/request';
// 获取账号信息
export function fetch() {
  return request(`/dsp/account/info`);
}
// 更新账号信息
export function update({ payload }) {
	return request(`/dsp/account/contact/update?data=${payload}`)
}