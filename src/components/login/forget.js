/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  找回密码
 */

import { Form, Icon, Input, Button, Row, Col, message, Spin } from 'antd';
import ImgUpload from '../plugin/imgUpload';
import React, { Component } from 'react';
import Styles from './index.less';
import { Link } from 'dva/router';
import { connect } from 'dva';

const CreateForm = Form.create;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 18},
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
};

class Forget extends Component {
  // 立即重设
  submit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.props.dispatch({ type: 'login/setLoading', payload: { forgetLoading: true }});
      this.props.dispatch({ type: 'login/forget', payload: JSON.stringify(values) });
    })
  }

  // 获取验证码 
  getCode = () => {
    const mail = this.props.form.getFieldValue('mail');
    if (!mail) {
      message.error('请输入用户名');
      return;
    }
    this.props.dispatch({ type: 'login/setLoading', payload: { codeLoading: true }});
    this.props.dispatch({ type: 'login/getCode', payload: JSON.stringify({mail: mail}) });
  }

  render () {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={Styles.login}>
        <Form className={Styles.forget}>
          <h3 className={Styles.loginTitle}>找回密码</h3>
            <Spin spinning={this.props.forgetLoading}>
              <FormItem 
                label="用户名"
                {...formItemLayout}
              >
                {getFieldDecorator('mail', {
                  rules: [{
                    type: 'email',
                    message: '邮箱格式错误'
                  }, {
                    required: true,
                    message: '请输入您的邮箱'
                  }]
                })(
                  <Input placeholder="请输入您的邮箱"/>
                )}
              </FormItem>
              <FormItem
                label="验证码"
                {...formItemLayout}
              >
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('code', {
                      rules: [{
                        required: true,
                        message: '请输入验证码'
                      }]
                    })(
                      <Input size="large" placeholder="请输入验证码" />
                    )}
                  </Col>
                  <Col span={12}>
                    <Button
                      ghost
                      size="large"
                      type="primary"
                      loading={this.props.codeLoading}
                      onClick={this.getCode}>获取验证码</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="密码" {...formItemLayout}>
                {getFieldDecorator('password', {
                  rules: [{
                    min: 8,
                    message: '密码不少于8位'
                  },
                  {
                    required: true,
                    message: '请输入密码'
                  }],
                })(
                  <Input type="password" placeholder="请输入密码"/>
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button
                  type="primary"
                  size="large"
                  onClick={this.submit}
                  className={Styles.mr10}>立即重设</Button>
                <Button size="large">
                  <Link to="/login">返回</Link>
                </Button>
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
})(CreateForm({})(Forget));