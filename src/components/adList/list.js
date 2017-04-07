/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  广告列表
 */

import { Form, Row, Col, Input, Button, Select, Table, Radio, DatePicker, Pagination, Switch } from 'antd';
import { AccessControl } from '../../utils/common';
import RangePicker from '../plugin/rangePicker';
import EditableCell from '../plugin/editableCell';
import { pageSize } from '../../constants';
import React, { Component } from 'react';
import { createForm } from 'rc-form';

import Styles from './adList.less';
import { Link } from 'dva/router';
import { connect } from 'dva';
import 'moment/locale/zh-cn';
import moment from 'moment';

moment.locale('zh-cn');

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;

class SearchList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			args: null,
			beginTime: moment().format('YYYY-MM-DD'),
			endTime: moment().format('YYYY-MM-DD')
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
  		this.search()
  	})
  }

  // 切换时间
	handleRangePicker = (beginTime, endTime) => {
		this.setState({
			beginTime: moment(beginTime).format('YYYY-MM-DD'),
			endTime: moment(endTime).format('YYYY-MM-DD')
		}, () => {
			this.search()
		})
	}

	// 搜索
	search = () => {
		this.props.form.validateFields((err, values) => {
			const params = {
				beginTime: this.state.beginTime,
				auditStatus: values.auditStatus,
				endTime: this.state.endTime,
				email: values.email || '',
				name: values.name || '',
				status: values.status,
				page: this.state.page,
				pageSize: pageSize
			};
			this.setState({
				args: params
			});
			console.log('%c%s', 'color: #04B894', 'params:' + JSON.stringify(params));
			this.props.dispatch({
				type: 'adList/fetch',
				payload: JSON.stringify(params)
			})
    });
	}

	// 开关
	switch = (id, checked) => {
		const type = checked ? 'adList/pushOpen' : 'adList/pushClose';
		const params = {
			id: id,
			args: this.state.args
		};
		this.props.dispatch({
			type: type,
			payload: params
		});
	}

	// 修改出价
	onCellChangeFee = (id, key) => {
		const params = {
			id: id,
			fee: key
		};
		this.props.dispatch({
			type: 'adList/updateFee',
			payload: JSON.stringify(params)
		})
  }

  // 修改日预算
	onCellChangeDayBudget = (id, key) => {
		const params = {
			id: id,
			dayBudget: key
		};
		this.props.dispatch({
			type: 'adList/updateDayBudget',
			payload: JSON.stringify(params)
		});
  }
  
	render () {
		const { getFieldDecorator } = this.props.form;
    const permissionList = this.props.permissions;
		const columns = [{
		  title: '广告计划名称	',
		  dataIndex: 'name',
		  key: 'name',
		  render: (text, record) => {
		  	return (
		  		<Link to={`/page/ad/detail/${record.id}`}>{text}</Link>
		  	)
		  }
		}, {
		  title: '客户公司名称	',
		  dataIndex: 'entName',
		  key: 'entName',
		  render: (text, record) => {
		  	return (
		  		<Link to={`/page/manageCustomer?companyName=${record.entName}`}>{text}</Link>
		  	)
		  }
		}, {
		  title: '曝光量',
		  dataIndex: 'exposureCount',
		  key: 'exposureCount'
		}, {
		  title: '点击量',
		  dataIndex: 'clickCount',
		  key: 'clickCount'
		}, {
		  title: '已发放/库存(张)',
		  dataIndex: 'inventoryConsumeTotal',
		  key: 'inventoryConsumeTotal',
		  render: (text, record) => {
		    return (
		      <span>{record.launchCount}/{record.inventory}</span>
		    )
		  }
		}, {
		  title: '消耗(元)',
		  dataIndex: 'consumeTotal',
		  key: 'consumeTotal'
		}, {
		  title: '出价(元/次)',
		  dataIndex: 'fee',
		  key: 'fee',
		  render: (text, record, index) => (
		  	AccessControl(permissionList, 'dsp_ad_modify') ? 
	        <EditableCell
	          value={text}
	          onChange={this.onCellChangeFee.bind(this, record.id)}
	        /> : text
      )
		}, {
		  title: '日预算(元/天)',
		  dataIndex: 'dayBudget',
		  key: 'dayBudget',
		  render: (text, record, index) => (
		  	AccessControl(permissionList, 'dsp_ad_modify') ? 
	        <EditableCell
	          value={text}
	          onChange={this.onCellChangeDayBudget.bind(this, record.id)}
	        /> : text
      )
		}, {
		  title: '状态',
		  dataIndex: 'statusText',
		  key: 'statusText'
		}, {
		  title: '操作',
		  dataIndex: 'status',
		  key: 'status',
		  render: (text, record) => {
		  	const content = AccessControl(permissionList, 'dsp_ad_modify') ? 
		  	(
		  		<Switch
		      	checked={text}
		        checkedChildren={'开'}
		        unCheckedChildren={'关'}
		        onChange={this.switch.bind(this, record.id)}
		      />
		    ) : '';
		    return content;
		  }
		}];

		const pageConfig = {
    	className: "ant-table-pagination",
      total: this.props.totalCount,
      onChange: this.handlePage,
      current: this.state.page,
      pageSize: pageSize,
		};

		return (
			<Form layout="inline">
				<div className={Styles.search}>
					<Row>
						<Col span={24}>
							<FormItem label="广告计划名称">
								{getFieldDecorator('name')(
									<Input placeholder="请输入广告计划名称" />
	        			)}
							</FormItem>
							<FormItem label="客户注册邮箱">
								{getFieldDecorator('email')(
									<Input placeholder="请输入客户注册邮箱" />
	        			)}
							</FormItem>
							<FormItem label="审核状态">
								{getFieldDecorator('auditStatus', {
									initialValue: ''
								})(
									<Select> 
			              <Option value="">全部广告</Option>
			              <Option value="0">审核中</Option>
			              <Option value="1">审核通过</Option>
			              <Option value="-1">审核拒绝</Option>
			            </Select>
			          )}
							</FormItem>
							<FormItem label="广告状态">
								{getFieldDecorator('status', {
									initialValue: ''
								})(
									<Select> 
			              <Option value="">全部广告</Option>
			              <Option value="0">暂停</Option>
			              <Option value="1">打开</Option>
			              <Option value="2">余额不足</Option>
			              <Option value="3">库存不足</Option>
			              <Option value="4">非投放日期</Option>
			              <Option value="5">优惠券失效</Option>
			            </Select>
			           )}
							</FormItem>
							<Button type="primary" size="large" onClick={this.search}>查询</Button>
						</Col>
					</Row>
				</div>
				<Row className={Styles.list}>
					<Col span={24} className={Styles.head}>
						<span className={Styles.subTitle} style={{marginRight: 35}}>所有广告</span>
						{
							AccessControl(permissionList, 'dsp_ad_create') ? 
							 	<Button size="large" type="primary"><Link to="/page/ad/create">发布广告</Link></Button> : null
						}
						<div className={Styles.timeFilter}>
							<RangePicker {...this.props} onComplete={this.handleRangePicker} />							
						</div>
					</Col>
					<Col span={24}>
						<Table
							className={Styles.pageList}
							rowKey={record => record.id}
							dataSource={this.props.list}
							pagination={pageConfig}
							columns={columns}
						/>
					</Col>
				</Row>
			</Form>
		)
	}
}

export default connect((state) => {
	const { list, totalCount } = state.adList;
	const { permissions } = state.indexPage;
	return {
		list,
		totalCount,
		permissions
	}
})(createForm({})(SearchList))
