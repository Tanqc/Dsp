/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  新建客户
 */

import { Form, Row, Col, Input, Button, Select, Table } from 'antd';
import ImgUpload from '../plugin/imgUpload';
import React, { Component } from 'react';
import Styles from './index.less';
import { connect } from 'dva';

const CreateForm = Form.create;
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 }
};

class Customer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmDirty: false,
			licenseUrl: ''
		}
	}
	
	// 提交
	submit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, fieldsValue) => {
			const params = Object.assign(fieldsValue, {
				licenseUrl: this.state.licenseUrl
			});
			console.log(params);
			if (!err) {
        this.props.dispatch({
        	type: 'createCustomer/submit',
        	payload: JSON.stringify(params)
        })
      }
		})
	}
	
	// 搜索
	filterOperator = (input, option) => {
    return option.props.children.indexOf(input) > -1
  }

  // 操作员列表
	operatorList = () => {
		const { getFieldDecorator } = this.props.form;
		const { operatorList } = this.props;
		const Options = operatorList.map(
      item => <Option key={item.id} value={item.id.toString()}>{item.name}</Option>
    );
		const operators = (
			<FormItem {...formItemLayout}>
				{getFieldDecorator('opUserId', {
					rules: [{
          	required: true,
          	message: '请填写'
          }]
				})(
					<Select
		        filterOption={this.filterOperator}
		        showSearch
		        placeholder="请分配一个操作员"
		      >
		        { Options }
		      </Select>
				)}
			</FormItem>
		);
		return operators;
	}
	// 密码二维确认
	validateConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  // 失焦进行密码二次校验
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  // 密码二次校验
  validatePassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致');
    } else {
      callback();
    }
  }
  // 上传营业执照
  handleLicenseUrl = (url) => {
  	this.setState({
  		licenseUrl: url
  	})
  }
 // render
	render () {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form className={Styles.newCustomer}>
				<p>操作员</p>
				{this.operatorList()}
				<p>客户信息</p>
				<FormItem {...formItemLayout}>
					{getFieldDecorator('mail', {
						rules: [{
            	required: true,
            	message: '请填写'
            }, {
            	validator: this.validateConfirm
            }]
					})(
						<Input placeholder="邮箱" />
					)}
				</FormItem>
				<FormItem {...formItemLayout}>
					{getFieldDecorator('password', {
						rules: [{
            	required: true,
            	message: '请填写'
            }]
					})(
						<Input type="password" placeholder="密码" />
					)}
				</FormItem>
				<FormItem {...formItemLayout}>
					{getFieldDecorator('confirmPassword', {
						rules: [{
            	required: true,
            	message: '请填写'
            }, {
            	validator: this.validatePassword
            }]
					})(
						<Input type="password" placeholder="请再次输入新密码" onBlur={this.handleConfirmBlur} />
					)}
				</FormItem>
				<p>客户资料</p>
				<FormItem {...formItemLayout}>
					{getFieldDecorator('entName', {
						rules: [{
            	required: true,
            	message: '请填写'
            }]
					})(
						<Input placeholder="公司全称" />
					)}
				</FormItem>
				<FormItem {...formItemLayout}>
					{getFieldDecorator('registerCode', {
						rules: [{
            	required: true,
            	message: '请填写'
            }]
					})(
						<Input placeholder="营业执照注册号" />
					)}
				</FormItem>
				<FormItem {...formItemLayout}>
					{getFieldDecorator('licenseUrl', {
						rules: [{
            	required: false,
            	message: '请填写'
            }]
					})(
						<ImgUpload onComplete={this.handleLicenseUrl} />
					)}
				</FormItem>
				<FormItem {...formItemLayout}>
					{getFieldDecorator('address', {
						rules: [{
            	required: true,
            	message: '请填写'
            }]
					})(
						<Input placeholder="公司地址" />
					)}
				</FormItem>
				<p>联系人信息</p>
				<FormItem {...formItemLayout}>
					{getFieldDecorator('contactName', {
						rules: [{
            	required: true,
            	message: '请填写'
            }]
					})(
						<Input placeholder="联系人姓名" />
					)}
				</FormItem>
				<FormItem {...formItemLayout}>
					{getFieldDecorator('contactTel', {
						rules: [{
            	required: true,
            	message: '请填写'
            }]
					})(
						<Input placeholder="手机号码" />
					)}
				</FormItem>
				<FormItem {...formItemLayout}>
					{getFieldDecorator('contactQQ', {
						rules: [{
            	required: true,
            	message: '请填写'
            }]
					})(
						<Input placeholder="qq号码" />
					)}
				</FormItem>
				<Button type="primary" size="large" onClick={this.submit}>提交审核</Button>
			</Form>
		)
	}
}

export default connect((state) => {
	const { operatorList } = state.createCustomer;
	return {
		operatorList
	}
})(CreateForm({})(Customer));

