/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  首页
 */
import React from 'react';
import NewAd from './newAd';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { createForm } from 'rc-form';
import Statistics from './statistics';
import Consulting from './consulting';
import Styles from './indexPage.less';
import NewAdvertiser from './newAdvertiser';
import { AccessControl } from '../../utils/common';

const IndexPage = (props) => {
  const permissionList = props.permissions;
  return (
    <div className={Styles.indexPage}>
      <Row gutter={15}>
        <Col span={AccessControl(permissionList, 'dsp_advert_list') ? 8 : 12}>
          <Consulting {...props.balance} />
        </Col>
        {
          AccessControl(permissionList, 'dsp_advert_list') ?
            <Col span={8}>
              <NewAdvertiser {...props.advert} permissions={props.permissions} />
            </Col> : null
        }
        <Col span={AccessControl(permissionList, 'dsp_advert_list') ? 8 : 12}>
          <NewAd {...props.agent} permissions={props.permissions} />
        </Col>
      </Row>
      <Statistics />
    </div>
  )
};

export default connect((state) => {
  const { balance, advert, agent, permissions } = state.indexPage;
  return {
    balance,
    advert,
    agent,
    permissions
  }
})(IndexPage);
