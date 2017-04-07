import request from '../utils/request';

export function fetch({ payload }) {
  return request(`/dsp/advertiser/list?data=${payload}`);
}