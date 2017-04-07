import * as manageCustomerService from '../services/manageCustomer';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';

export default {
  namespace: 'manageCustomer',
  state: {
    totalCount: 0,
  	list: []
  },
  reducers: {
    save(state, { payload: { list, totalCount} }) {
    	return { ...state, list, totalCount };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
    	const { data } = yield call(manageCustomerService.fetch, { payload });
    	if (data.success && data.data) {
        const result = data.data;
    		yield put({
	    		type: 'save',
	    		payload: {
	    			list: result.list,
            totalCount: result.totalCount
	    		}
	    	});
        return ;
    	}
      message.error(data.msg || '系统错误，请重试');
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/page/manageCustomer') {
          dispatch({
            type: 'fetch',
            payload: JSON.stringify({companyName: query.companyName})
          })
        }
      })
    }
  }
};
