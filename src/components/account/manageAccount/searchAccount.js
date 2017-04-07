import { Form, Row, Col, Input, Button, Select, Table, Pagination, Switch } from 'antd';
import { AccessControl } from '../../../utils/common';
import { pageSize } from '../../../constants';
import Styles from './manageAccount.less';
import React, { Component } from 'react';
import NewAccountModal from './newAccount';
import { connect } from 'dva';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

class SearchAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			args: null
		}
	}

	// 搜索
	search = () => {
		this.props.form.validateFields((err, values) => {
			console.log(values);
			const params = {
				roleCode: values.roleCode,
				name: values.name || '',
				mail: values.mail || '',
				status: values.status,
				page: this.state.page,
				pageSize: pageSize
			};
			this.setState({
				args: params
			});
			console.log('%c%s', 'color: #04B894', 'params:' + JSON.stringify(params));
			this.props.dispatch({
				type: 'manageAccount/fetch',
				payload: JSON.stringify(params)
			})
    });
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

	// 开关
	switch = (id, checked) => {
		const type = checked ? 'manageAccount/enable' : 'manageAccount/disable';
		const params = {
			userId: id,
			args: this.state.args
		};
		this.props.dispatch({
			type: type,
			payload: params
		});
	}

	// 删除
	del = (id) => {
		const params = {
			userId: id,
			args: this.state.args
		};
		this.props.dispatch({
			type: "manageAccount/del",
			payload: params
		});
	}

	render () {
		const { getFieldDecorator } = this.props.form;
    const permissionList = this.props.permissions;

		const columns = [{
		  title: '序号',
		  dataIndex: 'id',
		  key: 'id',
		  render: (text, record, index) => {
		  	return (
		  		<span>{index + 1}</span>
	  		)
		  }
		}, {
		  title: '账号',
		  dataIndex: 'email',
		  key: 'email',
		}, {
		  title: '名字',
		  dataIndex: 'name',
		  key: 'name',
		}, {
		  title: '角色',
		  dataIndex: 'roleName',
		  key: 'roleName',
		}, {
		  title: '状态',
		  dataIndex: 'status',
		  key: 'status',
		  render: (text, record) => {
		  	const content = AccessControl(permissionList, 'dsp_emp_modify') ?
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
		}, {
		  title: '广告主数量',
		  dataIndex: 'advertiserNum',
		  key: 'advertiserNum',
		}, {
		  title: '操作',
		  dataIndex: 'operator',
		  key: 'operator',
		  render: (text, record, index) => {
		  	const content = AccessControl(permissionList, 'dsp_emp_modify') ?
			  	(
			  		<a onClick={this.del.bind(this, record.id)}>删除</a>
			  	) : ''
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
			<div className={Styles.manageAccount}>
				<Form id="ddd" layout="inline" className={Styles.search}>
					<Row>
						<Col span={24}>
							<FormItem label="账号邮箱">
							{getFieldDecorator('mail')(
								<Input placeholder="请输入账号邮箱" />
							)}
							</FormItem>
							<FormItem label="账号名称">
								{getFieldDecorator('name')(
									<Input placeholder="请输入账号名称" />
								)}
							</FormItem>
							<FormItem label="角色状态">
								{getFieldDecorator('status', {
									initialValue: ''
								})(
									<Select> 
			              <Option value="">所有状态</Option>
			              <Option value="1">使用中</Option>
			              <Option value="0">已暂停</Option>
			            </Select>
			          )}
							</FormItem>
							<Button type="primary" size="large" onClick={this.search}>查询</Button>
						</Col>
					</Row>
				</Form>
				<Row className={Styles.list}>
					<Col span={24} className={Styles.head}>
						<span className={Styles.subTitle}>全部协作账号</span>
						{
							AccessControl(permissionList, 'dsp_emp_modify') ?
								<NewAccountModal onComplete={this.setRegion}>
									<Button type="primary" size="large" className={Styles.add}>新建协作账号</Button>
								</NewAccountModal> : null
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
	const { list, totalCount } = state.manageAccount;
  const { permissions } = state.indexPage;
	return {
		list,
		totalCount,
		permissions
	}
})(CreateForm({})(SearchAccount));

