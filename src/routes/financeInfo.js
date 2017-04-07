import React from 'react';
import { connect } from 'dva';
import FinanceInfoComponent from '../components/finance/financeInfo';

function FinanceInfo({ location }) {
  return (
    <FinanceInfoComponent />
  );
}

export default FinanceInfo;
