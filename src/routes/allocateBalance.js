/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  广告列表
 */
import React from 'react';
import { connect } from 'dva';
import AllocateBalanceComponent from '../components/finance/manageBalance/allocateBalance';

function AllocateBalance({ location }) {
  return (
    <AllocateBalanceComponent />
  );
}

export default AllocateBalance;
