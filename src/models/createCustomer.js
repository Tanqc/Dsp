import * as createCustomerService from '../services/createCustomer';
import { browserHistory } from 'dva/router';
import { message } from 'antd';

export default {
  namespace: 'createCustomer',
  state: {
    operatorList: []
  },
  reducers: {
    setOperator (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
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
    },
    *submit({ payload }, { call, put }) {
      const { data } = yield call(createCustomerService.submit, { payload });
      if (data.success) {
        message.success('创建成功');
        browserHistory.push('/page/manageCustomer');
        return;
      }
      message.error(data.msg || '系统错误，请重试');
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/page/createCustomer') {
          dispatch({
            type: 'fetchOperator'
          })
        }
      });
    }
  }
}