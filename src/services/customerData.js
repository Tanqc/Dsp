import request from '../utils/request';

export function fetch({ payload }) {
  return request(`/dsp/statistics/advertiser/data?data=${payload}`);
}