import React from 'react';
import { connect } from 'dva';
import ManageBalanceComponent from '../components/finance/manageBalance/manageBalance';

function ManageBalance({ location }) {
  return (
    <ManageBalanceComponent />
  );
}

export default ManageBalance;
