import * as loginService from '../services/login';
import { browserHistory } from 'dva/router';
import cookie from 'react-cookie';
import { message } from 'antd';

export default {
  namespace: 'login',
  state: {
    siginLoading: false,
    forgetLoading: false,
    registerLoading: false,
    codeLoading: false
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
    *sigin({ payload }, { select, call, put }) {
      const { data } = yield call(loginService.sigin, { payload });
      yield put({ type: 'setLoading', payload: { siginLoading: false }});
      if (data.success && data.data) {
        const result = data.data.returnToken;
        browserHistory.push('/page/indexPage');
        cookie.save('esid', data.data.returnToken, { path: '/' });        
        return;
      } 
      message.error(data.msg || '系统错误，请重试');
    },
    *forget({ payload }, { select, call, put }) {
      const { data } = yield call(loginService.forget, { payload });
      yield put({ type: 'setLoading', payload: { forgetLoading: false }});
      if (data.success) {
        message.success('密码修改成功，请重新登录');
        browserHistory.push('/login');
        return;
      }
      message.error(data.msg || '系统错误，请重试')
    },
    *register({ payload }, { select, call, put }) {
      const { data } = yield call(loginService.register, { payload });
      yield put({ type: 'setLoading', payload: { registerLoading: false }});
      if (data.success) {
        message.success('注册成功，请登录');
        browserHistory.push('/login');
        return;
      }
      message.error(data.msg || '系统错误，请重试')
    },
    *getCode({ payload }, { select, call, put }) {
      const { data } = yield call(loginService.getCode, { payload });
      yield put({ type: 'setLoading', payload: { codeLoading: false }});
      data.success ? message.success('验证码发送成功，请到邮箱查看') : message.error(data.msg || '系统错误，请重试');
    }
  },
  subscriptions: {
    
  }
};
