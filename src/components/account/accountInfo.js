/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  账号信息
 */
import { Row, Col, Button, Form, Input} from 'antd';
import { AccessControl } from '../../utils/common';
import React, { Component } from 'react';
import Styles from './accountInfo.less';
import { connect } from 'dva';

const FormItem = Form.Item;
const CreateForm = Form.create;
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 }
};

class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    }
  }

  showAccountInfo = () => {
    return (
      <div>
        <Row>
          <Col span={2}>联系人姓名：</Col><Col span={20}>{this.props.contactName || '-'}</Col>
        </Row>
        <Row>
          <Col span={2}>手机号码：</Col><Col span={20}>{this.props.contactTel || '-'}</Col>
        </Row>
        <Row>
          <Col span={2}>QQ号码：</Col><Col span={20}>{this.props.contactQQ || '-'}</Col>
        </Row>
      </div>
    )
  }

  editAccountInfo = () => {
    const  { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <FormItem
          label="联系人姓名"
          {...formItemLayout}
        >
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
        <FormItem
          label="手机号码"
          {...formItemLayout}
        >
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
        <FormItem
          label="QQ号码"
          {...formItemLayout}
        >
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
      </Form>
    )
  }

  edit = () => {
    this.setState({
      edit: true
    })
  }

  submit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.setState({
          edit: false
        }, () => {
          this.props.dispatch({
            type: "accountInfo/update",
            payload: JSON.stringify(fieldsValue)
          })
        })
      }
    })
  }

  render () {
    const permissionList = this.props.permissions;

    return (
      <div className={Styles.accountInfo}>
        <div className={Styles.title}>代理商信息</div>
        <Row>
        	<Col span={2}>公司全名：</Col><Col span={20}>{this.props.entName || '-'}</Col>
        </Row>
        <Row>
        	<Col span={2}>营业执照注册号：</Col><Col span={20}>{this.props.registerCode || '-'}</Col>
        </Row>
        <Row>
          <Col span={2}>公司地址：</Col><Col span={20}>{this.props.entAddress || '-'}</Col>
        </Row>
        <Row>
        	<Col span={2}>营业执照照片：</Col>
          <Col span={20}>
            <div className={Styles.licenseUrl}>
              <img src={this.props.licenseUrl } alt="营业执照照片" />
            </div>
          </Col>
        </Row>
        <div className={Styles.title}>联系人信息</div>
        <Row>
        	<Col span={2}>注册邮箱：</Col><Col span={20}>{this.props.contactMail || '-'}</Col>
        </Row>
        {
          !this.state.edit ? this.showAccountInfo() : this.editAccountInfo()
        }
        {
          AccessControl(permissionList, 'dsp_account_modify') ?
            <Row>
              <Col span={2}></Col>
              <Col span={20}>
                {
                  !this.state.edit ?  
                    <Button type="primary" size="large" onClick={this.edit}>编辑</Button>
                      :
                        <Button type="primary" size="large" onClick={this.submit}>保存</Button>
                }
              </Col>
            </Row> : null
        }
      </div>
    )
  }
}

export default connect((state) => {
  const { account } = state.accountInfo;
  const { permissions } = state.indexPage;

  return {
    ...account,
    permissions
  }
})(CreateForm({})(AccountInfo))


