/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  余额分配
 */

import { Form, Row, Col, Input, Button, Select, Table } from 'antd';
import React, { Component } from 'react';
import Styles from './manageBalance.less';
import { connect } from 'dva';
const CreateForm = Form.create;

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};

class AllocateBalance extends Component {
  filterAccount = (input, option) => {
    return option.props.children.indexOf(input) > -1
  }

  switchUser = (value) => {
    const params = {
      id: value
    }
    this.props.dispatch({
      type: "allocateBalance/getCurrentAccountInfo",
      payload: JSON.stringify(params)
    })
  }

  submit = () => {
  	this.props.form.validateFields((err, fieldsValue) => {
  		console.log(fieldsValue)
			if (!err) {
				this.props.dispatch({
		  		type: 'allocateBalance/submit',
		  		payload: JSON.stringify(fieldsValue)
		  	})
			}
		})
  }

	render () {
		const { bindList, account, balance } = this.props;
		const { getFieldDecorator } = this.props.form;
    const Options = bindList.map(
      item => <Option key={item.id} value={item.id.toString()}>{item.entName}</Option>
    );

		return (
			<Form className={Styles.allocateBalance}>
				<Row>
					<Col span={4}>可分配余额：</Col><Col span={8}>{balance? balance.balance : '------'}</Col>
				</Row>
				<FormItem
					label="充值客户"
					{...formItemLayout}
				>
					{getFieldDecorator('advertId', {
						rules: [{
						required: true,
						message: '请输入'
						}]
					})(
						<Select
						filterOption={this.filterAccount}
						onChange={this.switchUser}
						showSearch
						>
							{ Options }
						</Select>
					)}
				</FormItem>
				<Row>
					<Col span={4}>公司名称：</Col><Col span={8}>{ account ? account.companyName : '------' }</Col>
				</Row>
				<Row>
					<Col span={4}>客户余额：</Col><Col span={8}>{ account ? account.fundSum : '------' }</Col>
				</Row>
				<Row>
					<Col span={4}>联系人：</Col><Col span={8}>{ account ? account.contactName : '------' }</Col>
				</Row>
				<Row>
					<Col span={4}>手机号码：</Col><Col span={8}>{ account ? account.contactTel : '------' }</Col>
				</Row>
				<Row>
					<Col span={4}>QQ号码：</Col><Col span={8}>{ account ? account.contactQQ : '------' }</Col>
				</Row>
				<FormItem
					label="充值金额"
					{...formItemLayout}
				>
					{getFieldDecorator('fundNum', {
            rules: [{
              required: true,
              message: '请输入'
            }]
          })(
            <Input />
          )}
				</FormItem>
				<FormItem
					label="充值密码"
					{...formItemLayout}
				>
				{getFieldDecorator('password', {
            rules: [{
              required: true,
              message: '请输入'
            }],
          })(
            <Input type="password" />
          )}
				</FormItem>
				<Row style={{marginBottom: 0}}>
					<Col span={4}></Col>
					<Col span={8}>
						<Button type="primary" size="large" onClick={this.submit} className={Styles.mr15}>充值</Button>
						<Button type="primary" size="large">重设</Button>
					</Col>
				</Row>
			</Form>
		)
	}
};

export default connect((state) => {
  const { bindList, account, balance } = state.allocateBalance;
  return {
    bindList,
    account,
    balance
  }
})(CreateForm({})(AllocateBalance))