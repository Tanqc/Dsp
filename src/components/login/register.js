import { Form, Icon, Input, Button, Checkbox, Spin, Row, Col, message } from 'antd';
import React, { Component } from 'react';
import ImgUpload from '../plugin/imgUpload';
import { Link } from 'dva/router';
import { connect } from 'dva';
import Styles from './index.less';

const FormItem = Form.Item;
const CreateForm = Form.create;
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

class LoginIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      licenseUrl: '',
      protocol: true
    }
  }

  // 注册
  submit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) return;
      if (!this.state.licenseUrl) {
        message.error('请上传营业执照照片');
        return;
      }
      if (!this.state.protocol) {
        message.warning('请确认阅读并同意平台服务使用协议');
        return;
      }

      this.props.dispatch({ type: 'login/setLoading', payload: { registerLoading: true }});

      const params = Object.assign({
        loginType: 3,
        licenseUrl: this.state.licenseUrl
      }, values)
      this.props.dispatch({ type: 'login/register', payload: JSON.stringify(params) });
    })
  }

  // 营业执照照片
  handleLicenseUrl = (url) => {
    message.success('图片上传成功');
    this.setState({ licenseUrl: url })
  }

  // 获取验证码 
  getCode = () => {
    const mail = this.props.form.getFieldValue('mail');
    if (!mail) {
      message.error('请输入用户名');
      return;
    }
    this.props.dispatch({ type: 'login/setLoading', payload: { codeLoading: true } });
    this.props.dispatch({ type: 'login/getCode', payload: JSON.stringify({mail: mail}) });
  }

  // 平台服务协议
  handleProtocol = (e) => {
    this.setState({ protocol: e.target.checked })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={Styles.pt15}>
        <Form className={Styles.register}>
          <h3 className={Styles.loginTitle}>注册</h3>
          <Spin spinning={this.props.registerLoading}>
            <div className={Styles.mb5}>账户信息</div>  
            <FormItem>
              {getFieldDecorator('mail', {
                rules: [{
                  type: 'email',
                  message: '邮箱格式错误'
                },
                {
                  required: true,
                  message: '请输入'
                }]
              })(
                <Input placeholder="邮箱"/>
              )}
            </FormItem>
            <FormItem>
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator('code', {
                    rules: [{
                      required: true,
                      message: '请输入验证码'
                    }]
                  })(
                    <Input size="large" placeholder="验证码" />
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
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{
                  min: 8,
                  message: '密码不少于8位'
                },
                {
                  required: true,
                  message: '请输入'
                }]
              })(
                <Input type="password" placeholder="密码"/>
              )}
            </FormItem>
            <div className={Styles.mb5}>代理商信息</div>
            <FormItem>
              {getFieldDecorator('entName', {
                rules: [{
                  required: true, message: '请输入'
                }]
              })(
                <Input placeholder="公司全称" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('registerCode', {
                rules: [{
                  required: true,
                  message: '请输入'
                }]
              })(
                <Input placeholder="营业执照注册号" />
              )}
            </FormItem>
            <div className={Styles.mb5}>营业执照</div>
            <ImgUpload uploadType="licenseUrl" onComplete={this.handleLicenseUrl} />
            <FormItem>
              {getFieldDecorator('address', {
                rules: [{
                  required: true,
                  message: '请输入'
                }]
              })(
                <Input placeholder="公司地址" />
              )}
            </FormItem>
            <div className={Styles.mb5}>联系人信息</div>
            <FormItem>
              {getFieldDecorator('contactName', {
                rules: [{
                  required: true,
                  message: '请输入'
                }]
              })(
                <Input placeholder="联系人姓名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('contactTel', {
                rules: [{
                  required: true,
                  message: '请输入'
                }]
              })(
                <Input placeholder="手机号码" />
              )}
            </FormItem>
            <FormItem>
              <Checkbox checked={this.state.protocol} onChange={this.handleProtocol}>我已阅读并同意<Link to="/agreement" target="_blank">《平台服务使用协议》</Link></Checkbox>
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button
                type="primary"
                size="large"
                onClick={this.submit}
                className={Styles.mr10}>立即注册</Button>
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
})(CreateForm({})(LoginIn));