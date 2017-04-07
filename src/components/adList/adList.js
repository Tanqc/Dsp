/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  广告列表
 */
import React from 'react';
import List from './list';
import Styles from './adList.less';

const AdList = () => {
  return (
    <div className={Styles.adList}>
      <List />
    </div>
  )
};

export default AdList;