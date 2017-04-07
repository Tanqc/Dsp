import request from '../utils/request';
// 修改密码
export function submit({ payload }) {
	return request(`/user/mail/changePassword.action?data=${payload}`)
}
// 获取验证码
export function getCode({ payload }) {
  return request(`/user/mail/sendActivationCode.action?data=${payload}`)
}