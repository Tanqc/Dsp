/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  新建广告主
 */

import React, { Component } from 'react';
import Styles from './indexPage.less';
import { Row, Col, Icon } from 'antd';
import { Link } from 'dva/router';
import { AccessControl } from '../../utils/common';

class NewAdvertiser extends Component {
	render () {
    const permissionList = this.props.permissions;
		return (
			<Row className={Styles.newAdvertiser}>
				<Col span={24} className={Styles.container}>
					<Row className={Styles.p10}>
						<Col span={24} className={Styles.title}>广告主统计</Col>
					</Row>
					<Row className={Styles.p10}>
						<Col span={24}>总广告主：
							<a>{this.props.advertTotalCount || 0}</a>
						</Col>
					</Row>
					<Row className={Styles.p10}>
						<Col span={12}>使用中：
							<a>{this.props.advertPassCount || 0}</a>
						</Col>
						<Col span={12}>邮箱验证中：
							<a>{this.props.emailVerifyingCount || 0}</a>
						</Col>
					</Row>
					<Row className={Styles.p10}>
						<Col span={12}>审核中：
							<a>{this.props.advertAuditingCount || 0}</a>
						</Col>
						<Col span={12}>未通过：
							<a className={Styles.notPass}>{this.props.advertNotPassCount || 0}</a>
						</Col>
					</Row>
				</Col>
				<Col span={24} className={Styles.actionBtn}>
				{
					AccessControl(permissionList, 'dsp_advert_modify') ?
						<Link to="/page/createCustomer"><Icon type="plus" />新建广告主</Link> : null
				}
				</Col>
			</Row>
		)
	}
};

export default NewAdvertiser;
