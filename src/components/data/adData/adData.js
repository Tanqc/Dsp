/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  广告数据
 */
import { Form, Row, Col, Input, Button, Select, Table, Radio, DatePicker, Pagination } from 'antd';
import RangePicker from '../../plugin/rangePicker';
import { pageSize } from '../../../constants';
import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { columns } from './columns';
import Styles from './adData.less';
import { connect } from 'dva';
import 'moment/locale/zh-cn';
import moment from 'moment';

moment.locale('zh-cn');

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;

class SearchAdData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
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
  		this.search();
  	})
  }
  // 切换时间
	handleRangePicker = (beginTime, endTime) => {
		this.setState({
			beginTime: moment(beginTime).format('YYYY-MM-DD'),
			endTime: moment(endTime).format('YYYY-MM-DD')
		}, () => {
			this.search();
		})
	}
  // 搜索
	search = () => {
		this.props.form.validateFields((err, values) => {
			const params = {
				companyName: values.companyName || '',
				planName: values.planName || '',
				beginTime: this.state.beginTime,
				endTime: this.state.endTime,
				mail: values.mail || '',
				page: this.state.page,
				pageSize: pageSize
			};
			console.log('%c%s', 'color: #04B894', 'params:' + JSON.stringify(params));
			this.props.dispatch({
				type: 'adData/fetch',
				payload: JSON.stringify(params)
			})
    });
	}
	// create
	createDom = () => {
		const { getFieldDecorator } = this.props.form;
		const pageConfig = {
			className: "ant-table-pagination",
      total: this.props.totalCount,
      onChange: this.handlePage,
      current: this.state.page,
      pageSize: pageSize
		};

		return (
			<Form layout="inline">
				<Row className={Styles.search}>
					<Col span={24}>
						<FormItem label="广告计划名称">
							{getFieldDecorator('planName')(
								<Input placeholder="请输入广告计划名称" />
        			)}
						</FormItem>
						<FormItem label="客户注册邮箱">
							{getFieldDecorator('mail')(
								<Input placeholder="请输入客户注册邮箱" />
	      			)}
						</FormItem>
						<FormItem label="客户公司名称">
							{getFieldDecorator('companyName')(
								<Input placeholder="请输入客户公司名称" />
        			)}
						</FormItem>
						<Button type="primary" size="large" onClick={this.search}>查询</Button>
					</Col>
				</Row>
				<Row className={Styles.list}>
					<Col span={24} className={Styles.head}>
						<div className={Styles.timeFilter}>	
							<RangePicker {...this.props} onComplete={this.handleRangePicker} />
						</div>
					</Col>
					<Col span={24}>
						<Table
							rowKey={record => record.planId}
							dataSource={this.props.list}
							pagination={pageConfig}
							columns={columns}
						/>
					</Col>
				</Row>
			</Form>
		)
	}
	render () {
		return (
			<div className={Styles.adData}>
				{this.createDom()}
			</div>
		)
	}
}

export default connect((state) => {
	const { list, totalCount } = state.adData;
	return {
		list,
		totalCount
	}
})(createForm({})(SearchAdData));



















