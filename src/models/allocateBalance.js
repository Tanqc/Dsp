import * as allocateBalanceService from '../services/allocateBalance';
import * as indexPageService from '../services/indexPage';
import { browserHistory } from 'dva/router';
import { message } from 'antd';

export default {
  namespace: 'allocateBalance',
  state: {
    bindList: [],
    account: null,
    balance: null
  },
  reducers: {
    setBalance(state, { payload }) {
      return {
        ...state,
        balance: payload
      }
    },
    setAccountInfo(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    setCurrentAccountInfo(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {
    *submit({ payload }, { call, put }) {
      const { data } = yield call(allocateBalanceService.submit, { payload });
      if (data.success) {
        browserHistory.push('/page/allocateBalance');
        message.success('充值成功');
      } else {
        message.error(data.msg || '系统错误，请重试');
      }
    },
    *getCurrentAccountInfo({ payload }, { call, put }) {
      const { data } = yield call(allocateBalanceService.getCurrentAccountInfo, { payload });
      if (data.success && data.data) {
        const result = data.data;
        yield put({
          type: 'setCurrentAccountInfo',
          payload: {
            account: result
          }
        })
      }
    },
    *fetchAccountList({ payload }, { call, put }) {
      const { data } = yield call(allocateBalanceService.fetchAccountList);
      if (data.success && data.data) {
        const result = data.data;
        yield put({
          type: 'setAccountInfo',
          payload: {
            bindList: result
          }
        })
      }
    },
    *fetchBalance({ payload }, { call, put }) {
      const { data } = yield call(indexPageService.fetchBalance);
      if (data.success && data.data) {
        const result = data.data;
        yield put({
          type: 'setBalance',
          payload: {
            balance: result.balance
          },
        });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/page/allocateBalance') {
          dispatch({ type: 'fetchAccountList' });
          dispatch({ type: 'fetchBalance' })
        }
      });
    }
  }
};
