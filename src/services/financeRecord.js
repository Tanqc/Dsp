import request from '../utils/request';

export function fetch({ payload }) {
  return request(`/dsp/finance/advert/records?data=${payload}`);
}