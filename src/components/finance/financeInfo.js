import { Row, Col, Button, Icon, Steps } from 'antd';
import { AccessControl } from '../../utils/common';
import React, { Component } from 'react';
import Styles from './financeInfo.less';
import { Link } from 'dva/router';
import { connect } from 'dva';

const Step = Steps.Step;

class FinanceInfo extends Component{
  render () {
    const permissionList = this.props.permissions;

    return (
      <div className={Styles.financeInfo}>
        <Row className={Styles.manageBalance}>
          <Col span={4} className={Styles.pay}>
            <Icon type="pay-circle" />
          </Col>
          <Col span={4} className={Styles.info}>
            <p>账户余额（元） <span>{this.props.balance || '-'}</span></p>
            <p>今日消耗（元） <span>{this.props.consumeCurDay || '-'}</span></p>
          </Col>
          {
            AccessControl(permissionList, 'dsp_advert_fund_recharge') ?
              <Col span={4} className={Styles.action}>
                <Button size="large" type="primary">
                  <Link to="/page/manageBalance">余额分配</Link>
                </Button>
              </Col> : null
          }
        </Row>
        <Row className={Styles.payPath}>
          <Col span={24} className={Styles.title}>账号充值流程</Col>
          <Col span={24} className={Styles.p25}>
            <Steps current={1}>
              <Step status="process" title="联系顾问" />
              <Step status="process" title="汇款到指定银行账户" />
              <Step status="process" title="联系顾问确认汇款" />
              <Step status="process" title="账户充值" />
            </Steps>
          </Col>
          <Col span={24} className={Styles.p25}>
            <Button type="primary" size="large">
              <a href="http://wpa.qq.com/msgrd?v=3&uin=2154922350&site=qq&menu=yes" target="_blank">充值咨询</a>
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect((state) => {
  const { balance } = state.financeInfo;
  const { permissions } = state.indexPage;

  return {
    ...balance,
    permissions
  }
})(FinanceInfo)
