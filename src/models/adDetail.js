import * as createPlanService from '../services/createPlan';
import * as adDetailService from '../services/adDetail';
import { browserHistory } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';


export default {
  namespace: 'adDetail',
  state: {
  	detail: null,
    industry: null
  },
  reducers: {
  	save(state, { payload }) {
    	return {
    		...state,
    		...payload
    	}
    },
    queryIndustrySuccess(state, action) {
      return {
        ...state,
        ...action.payload
      } 
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
    	const { data } = yield call(adDetailService.fetch, { payload });
    	if (data) {
        const result = data.data;
    		yield put({
	    		type: 'save',
	    		payload: {
	    			detail: result
	    		}
	    	});
    	}
    },
    *queryIndustry({ payload: {} }, { select, call, put }) {
      const { data } = yield call(createPlanService.fetchIndustry);
      if (data) {
        yield put({
          type: 'queryIndustrySuccess',
          payload: {
            industry: data.data
          }
        })
      }
    },
    *delAd({ payload }, { select, call, put }){
      const { data } = yield call(adDetailService.delAd, { payload });
      if (data.success) {
        message.success('操作成功');
        browserHistory.push('page/adList');
        return;
      }
      message.error(data.msg || '系统错误，请重试');
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.log(pathname)
        const match = pathToRegexp('/page/ad/detail/:id').exec(pathname);
        if (match) {
          dispatch({
            type: 'fetch',
            payload: JSON.stringify({
              id: match[1]
            })
          })
          dispatch({
            type: 'queryIndustry',
            payload: {}
          })
        }
      })
    }
  }
};
