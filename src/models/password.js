import * as passwordService from '../services/password';
import { message } from 'antd';

export default {
  namespace: 'password',
  state: {
  	passLoading: false
  },
  reducers: {
    setLoading(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  effects: {
  	*submit({ payload }, { call, put }) {
  		const { data } = yield call(passwordService.submit, { payload });
      yield put({ type: 'setLoading', payload: { passLoading: false }});
  		if (data.success) {
  			message.success('密码修改成功');
        return;
  		}
      message.error(data.msg || '系统错误，请重试');
  	},
    *getCode({ payload }, { call, put }) {
    	const { data } = yield call(passwordService.getCode, { payload });
      yield put({ type: 'setLoading', payload: { passLoading: false }});
    	if (data.success) {
    		message.success('验证码发送成功，请到邮箱查看');
        return;
    	}
      message.error(data.msg || '系统错误，请重试');
    }
  },
  subscriptions: {
    
  }
};
