/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  广告详情
 */
import React from 'react';
import { connect } from 'dva';
import AdDetailComponent from '../components/ad/adDetail/index';

function AdDetail({ location }) {
  return (
      <AdDetailComponent />
  );
}

export default AdDetail;
