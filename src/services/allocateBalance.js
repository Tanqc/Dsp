import request from '../utils/request';

export function fetchAccountList() {
  return request(`/dsp/advertiser/getBaseList`);
}

export function getCurrentAccountInfo({ payload }) {
	return request(`/dsp/advertiser/finance/info?data=${payload}`)
}

export function submit({ payload }) {
	return request(`/dsp/finance/advert/recharge?data=${payload}`)
}