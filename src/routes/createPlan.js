/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  创建广告计划
 */

import React from 'react';
import { connect } from 'dva';
import CreateAdComponent from '../components/ad/createPlan/index';

function CreateAd({ location }) {
  return (
    <CreateAdComponent />
  );
}

export default connect()(CreateAd);
