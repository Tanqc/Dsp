/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  头部
 */

import { Row, Col, Select, Breadcrumb, Modal } from 'antd';
import { browserHistory } from 'dva/router';
import { Router, Link } from 'dva/router';
import React, { Component } from 'react';
import Styles from './header.less';
import { connect } from 'dva';

const BreadcrumbItem = Breadcrumb.Item;
const Option = Select.Option;

class Header extends Component {
  constructor(props) {
    super(props);
  }

  // search 账户
  filterAccount = (input, option) => {
    return option.props.children.indexOf(input) > -1
  }

  // 切换账户
  switchUser = (value) => {
    const params = { eid: value };
    this.props.dispatch({ type: "indexPage/switchUser", payload: JSON.stringify(params) });
  }

  // 退出登录
  logout = () => {
    Modal.confirm({
      title: '提示',
      content: '确认退出吗？',
      onOk: () => {
        this.props.dispatch({ type: "indexPage/logout" });
      }
    })
  }

  render () {
    const { bindList, account } = this.props;
    const eid = account && account.eid.toString();
    const Options = bindList && bindList.map(
      item => <Option key={item.eid} value={item.eid.toString()}>{item.name}</Option>
    );

    return (
      <Row className={Styles.header}>
        <Col span={3} className={Styles.center}>
          <Link className={Styles.logo} to="/page/indexPage">来推</Link>
        </Col>
        <Col span={21} className={Styles.changeAccount}>
        <Breadcrumb className={Styles.title} style={{display: 'none'}}>
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem><a href="">广告列表</a></BreadcrumbItem>
          </Breadcrumb>
          <div className={Styles.accountList}>
            <span>当前账户</span>
            <Select
              notFoundContent="没有找到"
              className={Styles.currentAccount}
              filterOption={this.filterAccount}
              onChange={this.switchUser}
              value={account && account.eid.toString()}
              showSearch
            >
              { Options }
            </Select>
            <a href="javascript:void(0);" className={Styles.logOut} onClick={this.logout}>退出</a>
          </div>
        </Col>
      </Row>
    )
  }
};

export default connect((state) => {
  return {

  }
})(Header)




