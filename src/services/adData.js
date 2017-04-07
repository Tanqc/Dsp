import request from '../utils/request';

export function fetch({ payload }) {
  return request(`/dsp/statistics/ad/plan/data?data=${payload}`);
}