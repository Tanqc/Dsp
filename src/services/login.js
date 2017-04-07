import request from '../utils/request';

// 登录
export function sigin({ payload }) {
  return request(`/1.0/user/login.action?data=${payload}`);
}

// 注册
export function register({ payload }) {
  return request(`/public/dsp/agent/register?data=${payload}`);
}

// 忘记密码
export function forget({ payload }) {
  return request(`/user/mail/changePassword.action?data=${payload}`);
}

// 获取验证码
export function getCode({ payload }) {
  return request(`/user/mail/sendActivationCode.action?data=${payload}`)
}