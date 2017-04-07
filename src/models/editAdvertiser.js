import * as editAdvertiserService from '../services/editAdvertiser';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';

export default {
  namespace: 'editAdvertiser',
  state: {
  	advertiserInfo: null,
    operatorList: []
  },
  reducers: {
    save(state, { payload }) {
    	return {
    		...state,
    		...payload
    	}
    },
    setOperator (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
    	const { data } = yield call(editAdvertiserService.fetch, { payload });
    	if (data) {
        const result = data.data;
    		yield put({
	    		type: 'save',
	    		payload: {
	    			advertiserInfo: result
	    		}
	    	});
    	}
    },
    *fetchOperator({ payload }, { call, put }) {
      const { data } = yield call(editAdvertiserService.fetchOperator);
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
      const { data } = yield call(editAdvertiserService.submit, { payload });
      if (data.success) {
        console.log('update success');
        message.success('信息更新成功');
      } else {
        message.error(data.msg || '系统错误，请重试');
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/page/editAdvertiser/:id').exec(pathname);
        if (match) {
          dispatch({ type: 'fetchOperator'});
          dispatch({ type: 'fetch', payload: JSON.stringify({id: match[1]}) });
        }
      });
    }
  }
};
