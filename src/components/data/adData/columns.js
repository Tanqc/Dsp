import { Link } from 'dva/router'

export const columns = [{
  title: '广告计划名称	',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '客户公司名称	',
  dataIndex: 'companyName',
  key: 'companyName',
  render: (text, record) => {
    return (
      <Link to={`/page/manageCustomer?companyName=${record.companyName}`}>{text}</Link>
    )
  }
},{
  title: '时间',
  dataIndex: 'time',
  key: 'time',
}, {
  title: '曝光量（次）',
  dataIndex: 'exposureCount',
  key: 'exposureCount',
}, {
  title: '点击（次）',
  dataIndex: 'clickCount',
  key: 'clickCount',
}, {
  title: '点击率',
  dataIndex: 'clickRate',
  key: 'clickRate',
}, {
  title: '点击均价',
  dataIndex: 'avgPrice',
  key: 'avgPrice',
}, {
  title: '总消耗（元）',
  dataIndex: 'consumeTotal',
  key: 'consumeTotal',
}];