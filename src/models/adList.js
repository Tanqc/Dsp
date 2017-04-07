import * as adListService from '../services/adList';
import { message } from 'antd';

export default {
  namespace: 'adList',
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
    	const { data } = yield call(adListService.fetch, { payload });
    	if (data.success && data.data) {
        const result = data.data;
    		yield put({
	    		type: 'save',
	    		payload: {
	    			list: result.list,
            totalCount: result.totalCount
	    		}
	    	});
        return;
    	}
      message.error(data.msg || '系统错误，请重试');
    },
    *pushOpen({ payload }, { call, put }) {
      const openParams = JSON.stringify({id: payload.id}),
            listParams = {params: payload.args};
      const { data } = yield call(adListService.pushOpen, { openParams });
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
    *pushClose({ payload }, { call, put }) {
      const closeParams = JSON.stringify({id: payload.id}),
            listParams = {params: payload.args};
      const { data } = yield call(adListService.pushClose, { closeParams });
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
    *updateFee({ payload }, { call, put }) {
      const { data } = yield call(adListService.updateFee, { payload });
      if (data.success) {
        message.success('修改成功');
        return;
      }
      message.error(data.msg || '系统错误，请重试');
    },
    *updateDayBudget({ payload }, { call, put }) {
      const { data } = yield call(adListService.updateDayBudget, { payload });
      if (data.success) {
        message.success('修改成功');
        return;
      }
      message.error(data.msg || '系统错误，请重试');
    }
  },
  subscriptions: {
  }
};
