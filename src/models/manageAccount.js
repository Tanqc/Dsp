import * as manageAccountService from '../services/manageAccount';
import { browserHistory } from 'dva/router';
import { message } from 'antd';

export default {
  namespace: 'manageAccount',
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
    *create({ payload }, { call, put }) {
      const { data } = yield call(manageAccountService.create, { payload });
      if (data.success) {
        message.success('创建成功');
        yield put({
          type: 'fetch'
        });
        return;
      }
      message.error(data.msg || '系统错误，请重试');
    },
    *enable({ payload }, { call, put }) {
      const enableParams = JSON.stringify({userId: payload.userId}),
            listParams = {params: payload.args};
      const { data } = yield call(manageAccountService.enable, { enableParams });
      if (data.success) {
        message.success('开启成功');
        yield put({
          type: 'fetch',
          payload: JSON.stringify(listParams)
        });
        return;
      }
      message.error(data.msg || '系统错误，请重试');
    },
    *disable({ payload }, { call, put }) {
      const disableParams = JSON.stringify({userId: payload.userId}),
            listParams = {params: payload.args};
      const { data } = yield call(manageAccountService.disable, { disableParams });
      if (data.success) {
        message.success('关闭成功');
        yield put({
          type: 'fetch',
          payload: JSON.stringify(listParams)
        });
        return;
      }
      message.error(data.msg || '系统错误，请重试');
    },
    *del({ payload }, { call, put }) {
      const delParams = JSON.stringify({userId: payload.userId}),
            listParams = {params: payload.args};
      const { data } = yield call(manageAccountService.del, { delParams });
      if (data.success) {
        message.success('删除成功');
        yield put({
          type: 'fetch',
          payload: JSON.stringify(listParams)
        })
        return;
      }
      message.error(data.msg || '系统错误，请重试');
    },
    *fetch({ payload }, { call, put }) {
      if (!payload) payload = JSON.stringify({"name":"","mail":"","status":"","page":1,"pageSize":10}); // TODO
    	const { data } = yield call(manageAccountService.fetch, { payload });
    	if (data.success && data.data) {
        const result = data.data;
    		yield put({
	    		type: 'save',
	    		payload: {
	    			list: result.list,
            totalCount: result.totalCount
	    		}
	    	});
    	} else {
        message.error(data.msg || '系统错误，请重试');
      }
    }
  },
  subscriptions: {
    
  }
};
