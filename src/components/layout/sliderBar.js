import { AccessControl } from '../../utils/common';
import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';
import Styles from './sliderBar.less';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class SlideBar extends Component {
  render () {
    const permissionList = this.props.permissions;

    return (
      <Menu 
        mode="inline"
        className={Styles.sliderBar}
        defaultOpenKeys={['ad', 'customer', 'data', 'finance', 'account']}
      >
        {
          AccessControl(permissionList, 'dsp_ad_list') ? 
          <SubMenu key="ad" title={<span>广告</span>}>
            <MenuItem key="adList">
              <Link to="/page/adList"><Icon type="bars" />广告列表</Link>
            </MenuItem>
          </SubMenu>: null
        }
        {
          AccessControl(permissionList, 'dsp_advert_list') ?
          <SubMenu key="customer" title={<span>客户</span>}>
            
                <MenuItem key="manageCustomer">
                  <Link to="/page/manageCustomer"><Icon type="team" />客户管理</Link>
                </MenuItem>
          </SubMenu> : null
        } 
        <SubMenu key="data" title={<span>数据</span>}>
          {
            AccessControl(permissionList, 'dsp_ad_data') ?
              <MenuItem key="adData">
                <Link to="/page/adData"><Icon type="bar-chart" />广告数据</Link>
              </MenuItem> : null
          }
          {
            AccessControl(permissionList, 'dsp_advert_data') ?
              <MenuItem key="customerData">
                <Link to="/page/customerData"><Icon type="solution" />客户数据</Link>
              </MenuItem> : null
          }
        </SubMenu>
        <SubMenu key="finance" title={<span>财务</span>}>
          {
            AccessControl(permissionList, 'dsp_fund') ?
              <MenuItem key="financeInfo">
                <Link to="/page/financeInfo"><Icon type="pay-circle-o" />财务信息</Link>
              </MenuItem> : null
          }
          {
            AccessControl(permissionList, 'dsp_fund_flow') ?
              <MenuItem key="financeRecord">
                <Link to="/page/financeRecord"><Icon type="calculator" />财务记录</Link>
              </MenuItem> : null
          }
          {
            AccessControl(permissionList, 'dsp_advert_fund_list') ?
              <MenuItem key="manageBalance">
                <Link to="/page/manageBalance"><Icon type="bank" />余额管理</Link>
              </MenuItem> : null
          }
        </SubMenu>
        <SubMenu key="account" title={<span>账号</span>}>
          {
            AccessControl(permissionList,'dsp_account_info') ?
              <MenuItem key="accountInfo">
                <Link to="/page/accountInfo"><Icon type="idcard" />账号信息</Link>
              </MenuItem> : null
          }
          {
            AccessControl(permissionList, 'dsp_account_reset_pwd') ?
              <MenuItem key="password">
                <Link to="/page/password"><Icon type="safety" />密码安全</Link>
              </MenuItem> : null
          }
          {
            AccessControl(permissionList, 'dsp_emp_list') ?
              <MenuItem key="manageAccount">
                <Link to="/page/manageAccount"><Icon type="lock" />权限管理</Link>
              </MenuItem> : null
          }
        </SubMenu>
      </Menu>
    )
  }
}

export default connect((state) => {
  const { permissions } = state.indexPage;
  return {
    permissions
  }
})(SlideBar);
