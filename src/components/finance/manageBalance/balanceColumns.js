export const columns = [{
  title: '客户名称',
  dataIndex: 'companyName',
  key: 'companyName'
}, {
  title: '联系人姓名',
  dataIndex: 'contactName',
  key: 'contactName',
}, {
  title: '手机号码',
  dataIndex: 'contactTel',
  key: 'contactTel',
}, {
  title: '账户余额',
  dataIndex: 'fundSum',
  key: 'fundSum',
  sorter: (a, b) => a.title.length - b.title.length
}, {
  title: '当日消耗',
  dataIndex: 'consumeTotal',
  key: 'consumeTotal',
  sorter: (a, b) => a.title.length - b.title.length
}, {
  title: '操作员',
  dataIndex: 'opUserId',
  key: 'opUserId',
}];