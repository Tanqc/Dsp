/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  数据统计
 */

import { columns } from './statisticsColumns';
import { Row, Col, Table, Radio } from 'antd';
import React, { Component } from 'react';
import Styles from './indexPage.less';
import { connect } from 'dva';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Statistics extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stage: 'lastWeek',
			beginTime: moment().subtract(7, 'days').format('YYYY-MM-DD'),
			endTime: moment().format('YYYY-MM-DD')
		}
	}

	// 初始化
	componentDidMount = () => {
		this.search()
  }

	// 搜索
	search = () => {
		const params = {
			beginTime: this.state.beginTime,
			endTime: this.state.endTime		
		};
		console.log('%c%s', 'color: #04B894', 'params:' + JSON.stringify(params));
		this.props.dispatch({
			type: 'indexPage/fetchStatistics',
			payload: JSON.stringify(params)
		})
	}

	handleStage = (e) => {
		let beginTime = '',
				endTime = '';
		const currentTime = e.target.value;
		switch (currentTime) {
			case 'lastWeek':
				beginTime = moment().subtract(7, 'days');
				endTime = moment();
				break;
			case 'lastMonth':
				beginTime = moment().subtract(30, 'days');
				endTime = moment();
				break;
			default:;
		}
		this.setState({
			beginTime: moment(beginTime).format('YYYY-MM-DD'),
			endTime: moment(endTime).format('YYYY-MM-DD'),
			stage: currentTime
		}, () => {
			this.search();
		});
	}
	// 总计
	statisticsFooter = () => {
		const item = this.props.statistics;
		return (				
			<Row className={Styles.total}>
				<Col span={4}>总计</Col>
				<Col span={4} style={{paddingLeft: '1%'}}>{item.totalExposureCount}</Col>
				<Col span={4} style={{paddingLeft: '5.3%'}}>{item.totalClickCount}</Col>
				<Col span={4} style={{paddingLeft: '9.7%'}}>{item.totalClickRate}</Col>
				<Col span={4} style={{paddingLeft: '6.6%'}}>{item.avgPrice}</Col>
				<Col span={4} style={{paddingLeft: '5.2%'}}>{item.totalConsumeTotal}</Col>
			</Row> : ''
		)
	}

	render () {
		return (
			<div className={Styles.statistics}>
				<Row className={Styles.head}>
					<Col span={12}>
						<span className={Styles.subTitle}>数据统计</span>
						<span className={Styles.explain}>数据统计包括代理商旗下所有广告计划</span>
					</Col>
					<Col span={12} className={Styles.changeDate}>
						<RadioGroup
							value={this.state.stage}
							onChange={this.handleStage}
						>
				      <RadioButton value="lastWeek">最近7天</RadioButton>
				      <RadioButton value="lastMonth">最近30天</RadioButton>
				    </RadioGroup>
					</Col>
				</Row>
				<Row>
					<Col>
						<Table
							rowKey="curDate"
							pagination={false}
							columns={columns}
							dataSource={this.props.statistics ? this.props.statistics.list : null}
							footer={() => {
								return (
									this.props.statistics ? this.statisticsFooter() : ''
								)
							}}
						/>	
					</Col>
				</Row>
			</div>
		)
	}
};

export default connect((state) => {
  const { statistics } = state.indexPage;
  return {
    statistics
  }
})(Statistics);
