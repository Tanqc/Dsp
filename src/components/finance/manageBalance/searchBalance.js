/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  余额管理
 */
import { Form, Row, Col, Input, Button, Select, Table, Pagination } from 'antd';
import { AccessControl } from '../../../utils/common';
import { pageSize } from '../../../constants';
import {Router, Route, Link} from 'dva/router';
import { columns } from './balanceColumns';
import Styles from './manageBalance.less';
import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';

const Option = Select.Option;
const FormItem = Form.Item;

class SearchBalance extends Component {
	constructor(props) {
		super(props);
		this.state= {
			page: 1
		}
	}
	// 初始化
	componentDidMount = () => {
		this.search()
  }
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
				opUserId: values.opUserId || '',
				mail: values.mail || '',
				page: this.state.page,
				pageSize: pageSize
			};
			console.log('%c%s', 'color: #04B894', 'params:' + JSON.stringify(params));
			this.props.dispatch({
				type: 'manageBalance/fetch',
				payload: JSON.stringify(params)
			})
    });
	}
	render () {
		const { getFieldDecorator } = this.props.form;
		const permissionList = this.props.permissions;
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
							<FormItem label="客户邮箱">
								{getFieldDecorator('mail')(
									<Input placeholder="请输入查询邮箱" />
		      			)}
							</FormItem>
							<FormItem label="客户名称">
								{getFieldDecorator('companyName')(
									<Input placeholder="请输入客户名称" />
								)}
							</FormItem>
							<FormItem label="操作员">
								{getFieldDecorator('opUserId')(
									<Input placeholder="请输入操作员名称" />
								)}
							</FormItem>
							<Button type="primary" size="large" onClick={this.search} style={{marginRight: 20}}>查询</Button>
							{
								AccessControl(permissionList, 'dsp_advert_fund_recharge') ?
									<Button type="primary" size="large" className={Styles.fl}>
										<Link to="/page/allocateBalance">分配余额</Link>
									</Button> : null
							}
						</Col>
					</Row>
				</Form>
				<Row className={Styles.list}>
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
	const { list, totalCount } = state.manageBalance;
  const { permissions } = state.indexPage;

	return {
		list,
		totalCount,
		permissions
	}
})(createForm({})(SearchBalance));

