import * as indexPageService from '../services/indexPage';
import * as headerService from '../services/header';
import { browserHistory } from 'dva/router';

export default {
  namespace: 'indexPage',
  state: {
    account: null,
    statistics: null,
  	balance: null,
    advert: null,
    agent: null,
    bindList: [],
    permissions: []
  },
  reducers: {
    setBalance(state, { payload }) {
      return {
        ...state,
        balance: payload
      }
    },
    setAdvert(state, { payload }) {
      return {
        ...state,
        advert: payload
      }
    },
    setAgent(state, { payload }) {
      return {
        ...state,
        agent: payload
      }
    },
    setStatistics(state, { payload }) {
      return {
        ...state,
        statistics: payload
      }
    },
    setAccountInfo(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {
    // 退出
    *logout({ payload }, { select, call, put }) {
      const { data } = yield call(headerService.logout)
      if (data.success) {
        browserHistory.push('/login')
      }
    },
    *fetchBalance({ payload }, { call, put }) {
      const { data } = yield call(indexPageService.fetchBalance);
      if (data.success && data.data) {
        const result = data.data;
        yield put({
          type: 'setBalance',
          payload: {
            ...result
          },
        });
      }
    },
    *fetchAdvert({ payload }, { call, put }) {
      const { data } = yield call(indexPageService.fetchAdvert);
      if (data.success && data.data) {
        const result = data.data;
        yield put({
          type: 'setAdvert',
          payload: {
            ...result
          }
        })
      }
    },
    *fetchAgent({ payload }, { call, put }) {
      const { data } = yield call(indexPageService.fetchAgent);
      if (data.success && data.data) {
        const result = data.data;
        yield put({
          type: 'setAgent',
          payload: {
            ...result
          }
        })
      }
    },
    // 获取广告数据
    *fetchStatistics({ payload }, { call, put }) {
      const { data } = yield call(indexPageService.fetchStatistics, { payload });
      if (data.success && data.data) {
        const result = data.data;
        yield put({
          type: 'setStatistics',
          payload: {
            ...result
          }
        })
      }
    },
    // 切换账户
    *getAccountInfo({ payload }, { call, put }) {
      const { data } = yield call(headerService.fetch);
      // console.log(data.data)
      if (data.success && data.data) {
        const result = data.data;
        yield put({
          type: 'setAccountInfo',
          payload: {
            ...result
          }
        })
      }
    },
    *switchUser({ payload }, { call, put }) {
      const { data } = yield call(headerService.switchUser, { payload });
      if (data.success) {
        yield put({
          type: 'getAccountInfo'
        })
        browserHistory.push('/page/indexPage')
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/page/indexPage') {
          dispatch({ type: 'fetchBalance' });
          dispatch({ type: 'fetchAdvert' });
          dispatch({ type: 'fetchAgent' });
          dispatch({ type: 'getAccountInfo' });
        }
      });
    }
  }
}
