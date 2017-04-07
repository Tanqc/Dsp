import { Form, Row, Col, Input, Button, Select, Table, DatePicker, Pagination } from 'antd';
import { pageSize } from '../../../constants';
import Styles from './financeRecord.less';
import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import 'moment/locale/zh-cn';
import moment from 'moment';

moment.locale('zh-cn');

const { RangePicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;

class financeRecord extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			beginTime:  moment().subtract(10, 'days'),
			endTime: moment()
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
				beginTime: moment(this.state.beginTime).format('YYYY-MM-DD'),
				payType: values.payType || '',
				endTime: moment(this.state.endTime).format('YYYY-MM-DD'),
				mail: values.mail || '',
				page: this.state.page,
				pageSize: pageSize
			};
			console.log('%c%s', 'color: #04B894', 'params:' + JSON.stringify(params));
			this.props.dispatch({
				type: 'financeRecord/fetch',
				payload: JSON.stringify(params)
			})
    });
	}
	handlePicker = (dates, dateStrings) => {
		this.setState({
			beginTime: dates[0],
			endTime: dates[1]
		});
	}
	render () {
		const { getFieldDecorator } = this.props.form;
		const columns = [{
		  title: '日期',
		  dataIndex: 'curDate',
		  key: 'curDate',
		}, {
		  title: '客户名称',
		  dataIndex: 'companyName',
		  key: 'companyName',
		}, {
		  title: '存入（元）',
		  dataIndex: 'balanceIn',
		  key: 'balanceIn',
		}, {
		  title: '支出（元）',
		  dataIndex: 'balanceOut',
		  key: 'balanceOut',
		}, {
		  title: '备注',
		  dataIndex: 'remark',
		  key: 'remark',
		}];

		const pageConfig = {
			className: "ant-table-pagination",
	    total: this.props.totalCount,
	    onChange: this.handlePage,
	    current: this.state.page,
	    pageSize: pageSize
		};

		return (
			<div className={Styles.financeRecord}>
				<Form layout="inline" className={Styles.search}>
					<FormItem>
						<RangePicker
							size="large"
							onChange={this.handlePicker}
							value={[this.state.beginTime, this.state.endTime]}
						/>
					</FormItem>
					<FormItem>
						{getFieldDecorator('companyName')(
							<Input placeholder="客户名称" />
      			)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('email')(
							<Input placeholder="客户邮箱" />
      			)}
					</FormItem>
					<FormItem>
					{getFieldDecorator('payType', {
						initialValue: ''
					})(
						<Select>
							<Option key="0" value="">全部</Option>
							<Option key="1" value="1">存入</Option>
							<Option key="2" value="2">支出</Option>
						</Select>
      		)}
					</FormItem>
					<Button type="primary" size="large" onClick={this.search}>筛选</Button>
				</Form>
				<Row className={Styles.list}>
					<Col span={24}>
						<Table
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
	const { list, totalCount } = state.financeRecord;
	return {
		list,
		totalCount
	}
})(createForm({})(financeRecord));