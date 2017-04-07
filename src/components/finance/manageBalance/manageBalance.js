import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import SearchBalance from './searchBalance';
import AllocateBalance from './allocateBalance';
import Styles from './manageBalance.less';

const ManageBalance = () => {
  return (
    <Row className={Styles.manageBalance}>
      <Col>
      	<SearchBalance />
      </Col>
    </Row>
  )
};

export default ManageBalance;
