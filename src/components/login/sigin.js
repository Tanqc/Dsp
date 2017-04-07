/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  登录
 */

import { Form, Icon, Input, Button, Checkbox, Spin } from 'antd';
import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import Styles from './index.less';
import { connect } from 'dva';

const CreateForm = Form.create;
const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialAccount: '',
      rememberAccount: false
    }
  }

  // 记住账号
  handleRememberChange = (e) => {
    this.setState({
      rememberAccount: e.target.checked
    })
  }

  // 存入localStrage
  rememberAccount = (mail) => {
    if (this.state.rememberAccount) {
      window.localStorage.setItem('loginAccount', mail)
    } else {
      window.localStorage.removeItem('loginAccount')
    }
  }

  // 挂载后读取localStrage
  componentWillMount = () => {
    if (window.localStorage.getItem('loginAccount')) {
      this.setState({
        initialAccount: window.localStorage.getItem('loginAccount'),
        rememberAccount: true
      })
    }
  }

  // 登录
  submit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) return;

      this.props.dispatch({ type: 'login/setLoading', payload: { siginLoading: true }});

      const params = Object.assign(values, { loginType: 3 });
      this.props.dispatch({ type: 'login/sigin', payload: JSON.stringify(params) });
      this.rememberAccount(values.mail);
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={Styles.login}>
        <Form className={Styles.sigin}>
          <h3 className={Styles.loginTitle}>登录</h3>
            <Spin spinning={this.props.siginLoading}>
              <FormItem>
                {getFieldDecorator('mail', {
                  initialValue: this.state.initialAccount,
                  rules: [{
                    type: 'email',
                    message: '邮箱格式错误'
                  },
                  {
                    required: true,
                    message: '请输入用户名'
                  }]
                })(
                  <Input
                    prefix={<Icon type="user" style={{fontSize: 13}}/>}
                    placeholder="请输入用户名" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    message: '请输入密码'
                  }]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                    placeholder="请输入密码"
                    type="password"
                  />
                )}
              </FormItem>
              <FormItem>
                <Checkbox checked={this.state.rememberAccount} onChange={this.handleRememberChange}>记住账号</Checkbox>
                <Link className="login-form-forgot" to="/forget">忘记密码?</Link>
              </FormItem>
              <FormItem>
                <Button
                  className={Styles.block}
                  onClick={this.submit}
                  type="primary">登录</Button>
                <Link to="/register" className={Styles.fr}>立即注册→</Link>
              </FormItem>
            </Spin>
        </Form>
      </div>
    )
  }
};

export default connect((state) => {
  return {
   ...state.login
  }
})(CreateForm({})(Login));
