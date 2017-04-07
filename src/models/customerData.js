import * as customerDataService from '../services/customerData';
export default {
  namespace: 'customerData',
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
    	const { data } = yield call(customerDataService.fetch, { payload });
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
