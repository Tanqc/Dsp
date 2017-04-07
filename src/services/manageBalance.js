import request from '../utils/request';

export function fetch({ payload }) {
  return request(`/dsp/finance/advert/fund/list?data=${payload}`);
}