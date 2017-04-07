import React from 'react';
import { connect } from 'dva';
import CustomerDataComponent from '../components/data/customerData/customerData';

function CustomerData({ location }) {
  return (
    <CustomerDataComponent />
  );
}

export default connect()(CustomerData);
