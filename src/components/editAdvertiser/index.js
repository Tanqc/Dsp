/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  修改广告主信息
 */
import { Form, Row, Col, Input, Button, Select, Table } from 'antd';
import { AccessControl } from '../../utils/common';
import React, { Component } from 'react';
import Styles from './index.less';
import { connect } from 'dva';

const CreateForm = Form.create;
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 4 }
};

class Editadvertiser extends Component {
	submit = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log(values);
				const params = {
					contactName: values.contactName,
					contactTel: values.contactTel,
					contactQQ: values.contactQQ,
					opUserId: values.opUserId,
					id: this.props.id
				};
				console.log('%c%s', 'color: #04B894', 'params:' + JSON.stringify(params));
				this.props.dispatch({
					type: 'editAdvertiser/submit',
					payload: JSON.stringify(params)
				})
			}
    })
	}

	// 搜索
	filterOperator = (input, option) => {
    return option.props.children.indexOf(input) > -1
  }

	render () {
		const { advertiserInfo, operatorList } = this.props;
    const permissionList = this.props.permissions;
		const { getFieldDecorator } = this.props.form;
		const opid = this.props.operatorUserId ? this.props.operatorUserId.toString() : '';
		const Options = operatorList.map(
      item => <Option key={item.id}>{item.name}</Option>
    );

		return (
			<div className={Styles.editAdvertiser}>
				<div className={Styles.title}>代理商信息</div>
				<Row>
					<Col span={2}>公司全名：</Col>
					<Col span={20}>{this.props.entName || '-'}</Col>
				</Row>
				<Row>
					<Col span={2}>营业执照注册号：</Col>
					<Col span={20}>{this.props.entRegisterCode || '-'}</Col>
				</Row>
				<Row>
					<Col span={2}>营业执照照片：</Col>
					<Col span={20}>
						<div className={Styles.entLicenseUrl}>
							<img src={this.props.entLicenseUrl} alt="执业执照照片" />
						</div>
					</Col>
				</Row>
				<Row>
					<Col span={2}>公司地址：</Col><Col span={20}>{this.props.entAddress || '-'}</Col>
				</Row>
				<Form layout="horizontal">
					<p className={Styles.title}>操作员信息</p>
					<FormItem label="操作员" {...formItemLayout}>
						{getFieldDecorator('opUserId', {
							initialValue: opid,
							rules: [{
		          	required: true,
		          	message: '请填写'
		          }]
						})(
							<Select
				        showSearch
				        filterOption={this.filterOperator}
				        placeholder="请分配一个操作员"
				      >
				        { Options }
				      </Select>
						)}
					</FormItem>
					<p className={Styles.title}>联系人信息</p>
					<Row>
						<Col span={2}>注册邮箱：</Col><Col span={20}>{this.props.contactMail}</Col>
					</Row>
					<FormItem label="联系人姓名" {...formItemLayout}>
						{getFieldDecorator('contactName', {
							initialValue: this.props.contactName,
							rules: [{
	            	required: true,
	            	message: '请填写'
	            }]
						})(
							<Input />
						)}
					</FormItem>
					<FormItem label="手机号码" {...formItemLayout}>
						{getFieldDecorator('contactTel', {
							initialValue: this.props.contactTel,
							rules: [{
	            	required: true,
	            	message: '请填写'
	            }]
						})(
							<Input />
						)}
					</FormItem>
					<FormItem label="QQ号码" {...formItemLayout}>
						{getFieldDecorator('contactQQ', {
							initialValue: this.props.contactQQ,
							rules: [{
	            	required: true,
	            	message: '请填写'
	            }]
						})(
							<Input />
						)}
					</FormItem>
					{
						AccessControl(permissionList, 'dsp_advert_modify') ?
							<Row>
		          	<Col span={2}></Col>
		          	<Col span={20}>
									<Button type="primary" size="large" onClick={this.submit}>保存</Button>
								</Col>
							</Row> : null
					}
				</Form>
			</div>
		)
	}
};

export default connect((state) => {
	const { advertiserInfo, operatorList } = state.editAdvertiser;
	const { permissions } = state.indexPage;

	return {
		...advertiserInfo,
		operatorList,
		permissions
	}
})(CreateForm({})(Editadvertiser));
