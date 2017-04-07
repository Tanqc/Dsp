import * as createCustomerService from '../services/createCustomer';
import * as accountInfoService from '../services/accountInfo';
import { message } from 'antd';

export default {
  namespace: 'accountInfo',
  state: {
  	account: null
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
    *update({ payload }, { call, put }) {
      const { data } = yield call(accountInfoService.update, { payload });
      if (data.success) {
        message.success('操作成功');
        yield put({ type: 'fetch' })
        return;
      }
      message.error(data.msg || '系统错误，请重试');
    },
    *fetch({ payload }, { call, put }) {
    	const { data } = yield call(accountInfoService.fetch);
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
    *fetchOperator({ payload }, { call, put }) {
	    const { data } = yield call(createCustomerService.fetchOperator);
	    if (data.success && data.data) {
	      const result = data.data;
	      yield put({
	        type: 'setOperator',
	        payload: {
	          operatorList: result
	        }
	      })
	    }
	  }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/page/accountInfo') {
          dispatch({ type: 'fetch' });
          // dispatch({ type: 'fetchOperator' });
        }
      });
    }
  }
};
