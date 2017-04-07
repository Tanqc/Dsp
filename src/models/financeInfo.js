import * as indexPageService from '../services/indexPage';

export default {
  namespace: 'financeInfo',
  state: {
  	balance: null
  },
  reducers: {
    setBalance(state, { payload }) {
      return {
        ...state,
        balance: payload
      }
    }
  },
  effects: {
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
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/page/financeInfo') {
          dispatch({ type: 'fetchBalance' })
        }
      });
    }
  }
}
