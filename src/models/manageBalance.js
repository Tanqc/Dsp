import * as manageBalanceService from '../services/manageBalance';
export default {
  namespace: 'manageBalance',
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
    	const { data } = yield call(manageBalanceService.fetch, { payload });
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
