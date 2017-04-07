import { Modal, Form, Input, Select, Button, Row, Col } from 'antd';
import React, { Component } from 'react';
import Styles from './manageAccount.less';
import { connect } from 'dva';

const CreateForm = Form.create;
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};

class Account extends Component {

  handleSubmit = () => {
    const { onComplete } = this.props;
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.props.dispatch({
          type: 'manageAccount/create',
          payload: JSON.stringify(fieldsValue)
        })
        onComplete();
        this.props.form.resetFields();
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <FormItem
          label="登录邮箱"
          {...formItemLayout}
        >
          {getFieldDecorator('mail', {
            rules: [{
              type: 'email',
              message: '邮箱格式错误'
            },{
              required: true,
              message: '请填写'
            }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          label="登录密码"
          {...formItemLayout}
        >
          {getFieldDecorator('pwd', {
            rules: [{
              min: 8,
              message: '密码不少于8位'
            },{
              required: true,
              message: '请填写'
            }]
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          label="姓名"
          {...formItemLayout}
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true,
              message: '请填写'
            }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem 
          label="角色类型"
          {...formItemLayout}
        >
          {getFieldDecorator('roleCode', {
            initialValue: ''
          })(
            <Select>
              <Option value="dsp_agent_admin">管理员</Option>
              <Option value="dsp_agent_operator">操作员</Option>
              <Option value="dsp_agent_treasurer">财务员</Option>
            </Select>
           )}
        </FormItem>
        <Row>
          <Col push={5} span={15}>
            <Button type="primary" size="large" onClick={this.handleSubmit}>创建</Button>
          </Col>
        </Row>     
      </Form>
    )
  }
}

const AccountForm = connect((state) => {
  return {

  }
})(CreateForm()(Account))


class NewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }
  
  showModelHandler = () => {
    this.setState({
      visible: true
    })
  }

  hideModalHandler = () => {
    this.setState({
      visible: false
    })
  }

	render () {
    const { children } = this.props;
		return (
      <div className={Styles.newAccount}>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
  			<Modal
          maskClosable={false}
  				title="创建协作账号"
          onOk={this.okHandler}
  				visible={this.state.visible}
          onCancel={this.hideModalHandler}
          footer={null}
        >
          <AccountForm onComplete={this.hideModalHandler} />
        </Modal>
      </div>
		)
	}
}

export default NewAccount;