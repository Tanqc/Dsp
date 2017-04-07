/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  新建广告
 */

import React, { Component } from 'react';
import Styles from './indexPage.less';
import { Row, Col, Icon } from 'antd';
import { Link } from 'dva/router';
import { AccessControl } from '../../utils/common';

class NewAd extends Component {
	render () {
		const permissionList = this.props.permissions;
		return (
			<Row className={Styles.newAd}>
				<Col span={24} className={Styles.container}>
					<Row className={Styles.p10}>
						<Col span={24} className={Styles.title}>广告统计</Col>
					</Row>
					<Row className={Styles.p10}>
						<Col span={24}>总广告：
							<a>{this.props.advertCount || 0}</a>
						</Col>
					</Row>
					<Row className={Styles.p10}>
						<Col span={12}>投放中：
							<a>{this.props.puttingCount || 0}</a>
						</Col>
						<Col span={12}>未通过：
							<a className={Styles.notPass}>{this.props.refuseCount || 0}</a>
						</Col>
					</Row>
					<Row className={Styles.p10}>
						<Col span={12}>审核中：
							<a>{this.props.auditIngCount || 0}</a>
						</Col>
					</Row>
				</Col>
				<Col span={24} className={Styles.actionBtn}>
				{
					AccessControl(permissionList, 'dsp_ad_create') ?
					<Link to="/page/ad/create"><Icon type="plus" />新建广告</Link> : null
				}
				</Col>
			</Row>
		)
	}
};

export default NewAd;
