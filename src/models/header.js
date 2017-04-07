import * as headerService from '../services/header';
import { browserHistory } from 'dva/router';

export default {
  namespace: 'header',
  state: {
    account: null,
    permissions: [],
    bindList: []
  },
  reducers: {
    setAccountInfo(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {
    *logout({ payload }, { select, call, put }) {
      const { data } = yield call(headerService.logout)
      if (data.success) {
        browserHistory.push('/login')
      }
    },
    *switchUser({ payload }, { call, put }) {
      const { data } = yield call(headerService.switchUser, { payload });
      if (data.success) {
        console.log('switchUser success')
        yield put({
          type: 'getAccountInfo'
        })
        browserHistory.push('/page/indexPage')
      }
    },
    *getAccountInfo({ payload }, { call, put }) {
      const { data } = yield call(headerService.fetch);
      if (data.success && data.data) {
        const result = data.data;
        yield put({
          type: 'setAccountInfo',
          payload: {
            ...result
          }
        })
      }
    }
  },
  subscriptions: {
     setup({ dispatch, history }) {
      dispatch({
        type: 'getAccountInfo'
      });
    }
  }
};
