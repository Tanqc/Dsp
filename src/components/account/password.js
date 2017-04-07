/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  密码安全
 */
import { Form, Input, Button, Row, Col } from 'antd';
import React, { Component } from 'react';
import Styles from './password.less';
import { connect } from 'dva';

const CreateForm = Form.create;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};

class Password extends Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmDirty: false
		}
	}

	submit = () => {
		this.props.form.validateFields((err, fieldsValue) => {
			const params = {
				password: fieldsValue.password,
				mail: this.props.contactMail,
				code: fieldsValue.code
			}
			if (!err) {
				this.props.dispatch({
					type: 'password/submit',
					payload: JSON.stringify(params)
				})
        this.props.form.resetFields();
			}
		})
	}

	getCode = () => {
		const mail = {
			mail: this.props.contactMail
		};
    this.props.dispatch({ type: 'password/setLoading', payload: { passLoading: true }});
		this.props.dispatch({
			type: 'password/getCode',
			payload: JSON.stringify(mail)
		})
	}

	validateConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({
    	confirmDirty: this.state.confirmDirty || !!value 
    })
  }

  validatePassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  }

  validateConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

	render () {
		const { getFieldDecorator } = this.props.form;
		return (
	    <Form className={Styles.password}>
	    	<FormItem
	    		{...formItemLayout}
	    		label="邮箱"
	    	>
	    		{ this.props.contactMail }
	    	</FormItem>
	    	<FormItem
          {...formItemLayout}
          label="新密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: '请输入新密码'
            }, {
              validator: this.validateConfirm
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true,
              message: '请确认密码'
            }, {
              validator: this.validatePassword
            }]
          })(
            <Input type="password" onBlur={this.validateConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="验证码"
        >
          <Row gutter={8}>
            <Col span={8}>
              {getFieldDecorator('code', {
                rules: [{
                	required: true,
                	message: '请填写你获取到的验证码'
                }],
              })(
                <Input size="large" />
              )}
            </Col>
            <Col span={12}>
              <Button
                ghost
                size="large"
                type="primary"
                loading={this.props.passLoading}
                onClick={this.getCode}>获取验证码</Button>
            </Col>
          </Row>
        </FormItem>
        <Row>
          <Col span={20} push={4}>
            <Button type="primary" size="large" onClick={this.submit}>确认</Button>
          </Col>
        </Row>
	    </Form>
	  )
	}
}

export default connect((state) => {
	const { account } = state.indexPage;
	return {
		...account,
    ...state.password
	}
})(CreateForm({})(Password))
