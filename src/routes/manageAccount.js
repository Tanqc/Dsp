import React from 'react';
import { connect } from 'dva';
import ManageCountComponent from '../components/account/manageAccount/manageAccount';

function ManageCount({ location }) {
  return (
    <ManageCountComponent />
  );
}

export default connect()(ManageCount);
