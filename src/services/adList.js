import request from '../utils/request';

export function fetch({ payload }) {
  return request(`/dsp/ad/plan/list?data=${payload}`);
}

export function pushOpen({ openParams }) {
  return request(`/dsp/ad/plan/open?data=${openParams}`);
}

export function pushClose({ closeParams }) {
  return request(`/dsp/ad/plan/close?data=${closeParams}`);
}

export function updateFee({ payload }) {
  return request(`/dsp/ad/plan/fee/update?data=${payload}`);
}

export function updateDayBudget({ payload }) {
  return request(`/dsp/ad/plan/dayBudget/update?data=${payload}`);
}