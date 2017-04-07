import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import SearchCustomer from './searchCustomer'
import Styles from './manageCustomer.less'

const ManageCustomer = () => {
  return (
    <Row className={Styles.manageCustomer}>
      <Col>
      	<SearchCustomer />
      </Col>
    </Row>
  )
};

export default ManageCustomer;
