/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  广告详情
 */

import { Row, Col, Spin, Tabs, Button, Input, Modal } from 'antd';
import { AccessControl } from '../../../utils/common';
import React, {Component} from 'react';
import Styles from './index.less'; 
import {Link} from 'dva/router';
import { connect } from 'dva';


const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class AdDetail extends Component {
  constructor(props) {
    super(props)
  }

  // 投放平台
  setPlatform = () => {
    const {detail} = this.props,
          platform = detail.platform;
    let   temp = [];
    platform.map((item) => {
      switch (item) {
        case 1:
          temp.push('安卓')
          break;
        case 2:
          temp.push('IOS')
          break;
        case 3:
          temp.push('H5')
          break;
        default:;
      }
    })
    return temp.join('、');
  }

  // 投放区域
  setRegions = () => {
    const {detail} = this.props,
          regionCodes = detail.regionCodes.join('');
    if (regionCodes.indexOf('10') > -1 && regionCodes.indexOf('999') > -1) {
      return '全部地域';
    }
    return '部分地域';
  }

  // 行业标签
  setIndustry = () => {
    const {detail, industry} = this.props,
          industryIds = detail.industryIds;
    let   temp = [];
    industryIds.map((item) => {
      industry.map((items) => {
        if (items.children && items.children.length) {
          items.children.map((child) => {
            if (child.code === item) {
              temp.push(child.name)
            }
          })
        }
      })
    })
    return temp.join("、");
  }

  // 设置商品说明
  setDescription = () => {
    const { detail } = this.props,
          description = detail.coupon.description;

    return {
      __html: description
    }
  }

  // 广告删除
  delAd = () => {
    const { detail } = this.props;
    const _this = this;
    confirm({
      title: '确认删除该广告计划',
      onOk() {
        _this.props.dispatch({
          type: 'adDetail/delAd',
          payload: JSON.stringify({id: detail.id})
        })
      },
      onCancel() {
      }
    });
  }

  createDom = () => {
    const { detail } = this.props;
    const permissionList = this.props.permissions;

    return (
      <div className={Styles.adDetail}>
        <div className={Styles.title}>广告信息</div>
        <Row>
          <Col span={2}>推广计划：</Col>
          <Col span={20}>{detail.name}</Col>
        </Row>
        <Row>
          <Col span={2}>计费方式：</Col>
          <Col span={20}>CPC</Col>
        </Row>
        <Row>
          <Col span={2}>广告出价：</Col>
          <Col span={20}>{detail.fee}</Col>
        </Row>
        <Row>
          <Col span={2}>每日预算：</Col>
          <Col span={20}>{detail.dayBudget}</Col>
        </Row>
        <Row>
          <Col span={2}>投放平台：</Col>
          <Col span={20}>{this.setPlatform()}</Col>
        </Row>
        <Row>
          <Col span={2}>投放日期：</Col>
          <Col span={20}>{detail.beginTime} - {detail.endTime}</Col>
        </Row>
        <Row>
          <Col span={2}>投放地域：</Col>
          <Col span={20}>{this.setRegions()}</Col>
        </Row>
        <div className={Styles.title}>推广链接</div>
        <Row>
          <Col span={2}>推广链接：</Col>
          <Col span={20}>
            <a href={detail.coupon.promoteUrl} target="_blank">{detail.coupon.promoteUrl}</a></Col>
        </Row>
        <div className={Styles.title}>优惠券描述</div>
        <Row>
          <Col span={2}>商品名称：</Col>
          <Col span={20}>{detail.coupon.couponTitle}</Col>
        </Row>
        <Row>
          <Col span={2}>商品说明：</Col>
          <Col span={20}>
            <div dangerouslySetInnerHTML={this.setDescription()}></div>
          </Col>
        </Row>
         <Row>
          <Col span={2}>一句话描述：</Col>
          <Col span={20}>{detail.coupon.couponRemark}</Col>
        </Row>  
        <Row>
          <Col span={2}>商品图片：</Col>
          <Col span={20}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="缩略图" key="1">
                <img className={Styles.imgs} src={detail.coupon.thumbnailUrl} />
              </TabPane>
              <TabPane tab="Banner图" key="2">
                <img className={Styles.imgs} src={detail.coupon.bannerUrl} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <div className={Styles.title}>优惠码信息：</div>
        <Row>
          <Col span={2}>优惠码有效期：</Col>
          <Col span={20}>{detail.coupon.startValid} - {detail.coupon.endValid}</Col>
        </Row>
        <Row>
          <Col span={2}>优惠码内容：</Col>
          <Col span={20} className={Styles.couponInfo}>
            <div>
              {
                detail.coupon.type === 1 ? 
                <div>
                  <p>推广链接</p>
                  <p>优惠码数量： 剩余{detail.coupon.curInventory} / 总共{detail.coupon.inventory}</p>
                </div> : ''
              }
              {
                detail.coupon.type === 2 ?
                <div>
                  <p>可重复使用码</p>
                  <p>优惠码：{detail.coupon.codeContent}</p>
                  <p>密码：{detail.coupon.codePassword}</p>
                  <p>优惠券数量：剩余{detail.coupon.curInventory} / 总共{detail.coupon.inventory}</p>
                </div> : ''
              }
            </div>
            <div>标签：{this.setIndustry()}</div>
          </Col>
        </Row>
        {
          AccessControl(permissionList, 'dsp_ad_modify') ?
            <Row>
              <Col push={2} span={20}>
                <Button size="large" type="primary" className={Styles.mr10}>
                  <Link to={`/page/ad/edit/${detail.id}`}>编辑</Link>
                </Button>
                <Button type="danger" size="large" onClick={this.delAd}>删除</Button>
              </Col>
            </Row> : null
        }
      </div> 
    )
  }

  render () {
    return (
      <div>
        {
          (this.props.detail && this.props.industry) ? this.createDom() : <Spin size="large" tip="数据加载中..." />
        }
      </div>
    )
  }
}

export default connect((state) => {
  const { detail, industry } = state.adDetail;
  const { permissions } = state.indexPage;
  return {
    detail,
    industry,
    permissions
  }
})(AdDetail)

