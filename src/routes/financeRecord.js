import React from 'react';
import { connect } from 'dva';
import FinanceRecordComponent from '../components/finance/financeRecord/financeRecord';

function FinanceRecord({ location }) {
  return (
    <FinanceRecordComponent />
  );
}

export default connect()(FinanceRecord);
