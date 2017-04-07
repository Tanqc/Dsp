/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  创建广告计划
 */
import Styles from './index.less';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import Plan from '../adPlan';
import React from 'react';

const CreatePlan = (props) => {
  return (
    <div className={Styles.createPlan}>
      <Row className={Styles.adPlan}>
        <Col>
          <Plan {...props} />
        </Col>
      </Row>
    </div>
  )
};

export default connect((state) => {
  // console.log(state.createPlan)
  return {
    ...state.createPlan
  }
})(CreatePlan)

