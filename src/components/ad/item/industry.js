/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  行业
 */

import React, { Component, PropTypes } from 'react';
import Styles from './industry.less';
import { Transfer } from 'antd';

class Industry extends Component {
  constructor(props) {
    super(props);
  }
  // 已选标签
  handleChange = (nextTargetKeys, direction, moveKeys) => {
    const { onComplete } = this.props;
    onComplete(nextTargetKeys)
  }
  // 渲染item
  renderItem = (item) => {
    return {
      label: item.name,
      value: item.code
    }
  }
  // 筛选
  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1
  }
  createDom = () => {
    const { industry, industryIds } = this.props;
    let   dataSource = [];
    industry && industry.map((items) => {
      if (items.children && items.children.length) {
        items.children.map((item) => {
          dataSource.push(item);
        })
      }
    })
    return (
      <Transfer
        notFoundContent="列表为空"
        titles={['可选标签', '已选标签']}
        searchPlaceholder="请输入关键字搜索"
        showSearch
        dataSource={dataSource}
        render={item => item.name}
        onChange={this.handleChange}
        filterOption={this.filterOption}
        targetKeys={industryIds}
        rowKey={record => record.code}
      />
    )
  }
  // render
  render() {
    return (
      <div>
        { this.createDom() }
      </div>
    )
  }
};

export default Industry;