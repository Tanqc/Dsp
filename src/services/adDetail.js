import request from '../utils/request';

export function fetch({ payload }) {
  return request(`/dsp/ad/plan/detail?data=${payload}`);
}

// 删除广告
export function delAd({ payload }) {
	return request(`/dsp/ad/plan/delete?data=${payload}`);
}