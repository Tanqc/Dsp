/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  账户余额
 */
import React, { Component } from 'react';
import Styles from './indexPage.less';
import { Row, Col } from 'antd';

class Consulting extends Component {
	render () {
		return (
			<Row className={Styles.consulting}>
				<Col span={24} className={Styles.container}>
					<div className={Styles.content}>
						<p className={Styles.title}>我的账户余额</p>
						<p className={Styles.balance}>{this.props.balance || '-'}</p>
					</div>
				</Col>
				<Col span={24} className={Styles.actionBtn}>
					<a href="http://wpa.qq.com/msgrd?v=3&uin=2154922350&site=qq&menu=yes" target="_blank">充值咨询</a>
				</Col>
			</Row>
		)
	}
};

export default Consulting;
