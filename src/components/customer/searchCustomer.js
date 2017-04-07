import { Form, Row, Col, Input, Button, Select, Table, Pagination } from 'antd';
import { AccessControl } from '../../utils/common';
import {Router, Route, Link} from 'dva/router';
import Styles from './manageCustomer.less';
import { pageSize } from '../../constants';
import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import 'moment/locale/zh-cn';
import moment from 'moment';

moment.locale('zh-cn');

const FormItem = Form.Item;
const Option = Select.Option;

class SearchCustomer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1
		}
	}

	// // 初始化
	// componentDidMount = () => {
	// 	this.search()
 //  }
  
  // 分页
  handlePage = (page) => {
  	this.setState({
  		page: page
  	}, () => {
  		this.search();
  	})
  }

  // 搜索
	search = () => {
		this.props.form.validateFields((err, values) => {
			const params = {
				companyName: values.companyName || '',
				opUserName: values.opUserName || '',
				mail: values.mail || '',
				status: values.status,
				page: this.state.page,
				pageSize: pageSize
			};
			console.log('%c%s', 'color: #04B894', 'params:' + JSON.stringify(params));
			this.props.dispatch({
				type: 'manageCustomer/fetch',
				payload: JSON.stringify(params)
			})
    });
	}

	render () {
		const { getFieldDecorator } = this.props.form;
    const permissionList = this.props.permissions;

		const columns = [{
		  title: 'ID',
		  dataIndex: 'id',
		  key: 'id',
		}, {
		  title: '注册邮箱',
		  dataIndex: 'contactMail',
		  key: 'contactMail',
		}, {
		  title: '公司全称',
		  dataIndex: 'entName',
		  key: 'entName',
		}, {
		  title: '联系人',
		  dataIndex: 'contactName',
		  key: 'contactName',
		}, {
		  title: '手机号码',
		  dataIndex: 'contactTel',
		  key: 'contactTel',
		}, {
		  title: 'QQ号码',
		  dataIndex: 'contactQQ',
		  key: 'contactQQ',
		}, {
		  title: '状态',
		  dataIndex: 'statusText',
		  key: 'statusText',
		}, {
		  title: '操作员',
		  dataIndex: 'operatorName',
		  key: 'operatorName',
		}, {
		  title: '操作',
		  dataIndex: 'operator',
		  key: 'operator',
		  render: (text, record) => {
	  		const content = AccessControl(permissionList, 'dsp_advert_modify') ?
	  			(
	  				<Link to={`/page/editAdvertiser/${record.id}`}>编辑</Link>
	  			) : '';
		  	return content;
		  }
		}];

		const pageConfig = {
			className: "ant-table-pagination",
      total: this.props.totalCount,
      onChange: this.handlePage,
      current: this.state.page,
      pageSize: pageSize
		};

		return (
			<div>
				<Form layout="inline" className={Styles.search}>
					<Row>
						<Col span={24}>
							<FormItem label="注册邮箱">
								{getFieldDecorator('mail')(
									<Input placeholder="请输入注册邮箱" />
	        			)}
							</FormItem>
							<FormItem label="公司名称">
								{getFieldDecorator('companyName')(
									<Input placeholder="请输入公司名称" />
	        			)}
							</FormItem>
							<FormItem	label="操作员">
								{getFieldDecorator('opUserName')(
									<Input placeholder="请输入操作员名称" />
	        			)}
							</FormItem>
							<FormItem label="冻结状态">
								{getFieldDecorator('status', {
									initialValue: ''
								})(
									<Select> 
			              <Option value="">全部</Option>
			              <Option value="1">未冻结</Option>
			              <Option value="0">冻结中</Option>
			            </Select>
		            )}
							</FormItem>
							<Button type="primary" size="large" onClick={this.search}>查询</Button>
						</Col>
					</Row>
				</Form>
				<Row className={Styles.list}>
					<Col span={24} className={Styles.head}>
						<span className={Styles.subTitle}>所有广告主</span>
						{
							AccessControl(permissionList, 'dsp_advert_modify') ?
								<Button size="large" type="primary" className={Styles.add}>
									<Link to="/page/createCustomer">新建客户</Link>
								</Button> : null
						}
					</Col>
					<Col span={24}>
						<Table
							rowKey={record => record.id}
							dataSource={this.props.list}
							pagination={pageConfig}
							columns={columns}
						/>
					</Col>
				</Row>
			</div>
		)
	}
};

export default connect((state) => {
	const { list, totalCount } = state.manageCustomer;
	const { permissions } = state.indexPage;
	return {
		list,
		totalCount,
		permissions
	}
})(createForm({})(SearchCustomer));
