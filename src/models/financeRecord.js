import * as financeRecordService from '../services/financeRecord';
export default {
  namespace: 'financeRecord',
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
    	const { data } = yield call(financeRecordService.fetch, { payload });
    	if (data) {
        const result = data.data;
    		yield put({
	    		type: 'save',
	    		payload: {
	    			list: result.list,
            totalCount: result.totalCount
	    		}
	    	});
    	}
    }
  },
  subscriptions: {
    
  }
};
