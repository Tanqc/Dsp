/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  广告列表
 */
import React from 'react';
import { connect } from 'dva';
import AdListComponent from '../components/adList/adList';

function AdList({ location }) {
  return (
        <AdListComponent />
  );
}

export default AdList;
