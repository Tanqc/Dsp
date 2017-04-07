/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  权限管理
 */
import React from 'react';
import { Row, Col } from 'antd';
import Styles from './manageAccount.less';
import SearchAccount from './searchAccount';

const ManageAccount = () => {
  return (
    <Row className={Styles.manageAccount}>
      <Col>
      	<SearchAccount />
      </Col>
    </Row>
  )
};

export default ManageAccount;
