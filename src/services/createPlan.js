import request from '../utils/request';
// 地域信息
export function fetchAreas() {
  // options.credentials = 'include';
  return request(`/public/city/areas/get`);
}
// 行业信息
export function fetchIndustry() {
	return request(`/public/tag/industry/get`);
}

// 表单提交
export function submit({ payload }) {
	return request(`/dsp/ad/plan/create`, {
		method: 'post',
		headers:{'Content-Type':'application/json'},
	  body: JSON.stringify(payload)
	});
}

// 表单更新
export function modify({ payload }) {
	return request(`/dsp/ad/plan/update`, {
		method: 'post',
		headers: {'Content-Type':'application/json'},
	  body: JSON.stringify(payload)
	});
}