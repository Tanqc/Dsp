import areas from './mock/areas'; // 地域 
import industry from './mock/industry'; // 行业
import init from './mock/init'; // 初始化
import adData from './mock/adData'; // 广告数据
import adList from './mock/adList'; // 广告列表
import financeInfo from './mock/financeInfo'; // 财务信息
import advert from './mock/advert'; // 广告主统计
import agent from './mock/agent'; // 广告统计
import statistics from './mock/statistics'; // 数据统计
import pushOpen from './mock/pushOpen'; // 广告列表开
import pushClose from './mock/pushClose'; // 广告列表关
import fee from './mock/updateFee'; // 广告列表修改出价
import dayBudget from './mock/updateDayBudget'; // 广告列表修改日预算
import advertiser from './mock/advertiser'; // 客户管理所有广告主
import customerData from './mock/customerData'; // 客户数据
import manageBalance from './mock/manageBalance'; // 余额管理
import financeRecord from './mock/financeRecord'; // 财务记录
import manageAccount from './mock/manageAccount'; // 权限管理
import createAdvertiser from './mock/createAdvertiser'; // 新建客户
import editAdvertiser from './mock/editAdvertiser'; // 客户编辑
import updateAdvertiser from './mock/updateAdvertiser'; // 客户更新
import adDetail from './mock/adDetail'; // 广告详情

export default {
	'GET /public/city/areas/get': areas,
	'GET /public/tag/industry/get': industry,
	'GET /dsp/account/info': init,
	'GET /dsp/statistics/ad/plan/data': adData,
	'GET /dsp/finance/self/get': financeInfo,
	'GET /dsp/account/advert/statInfo': advert,
	'GET /dsp/ad/plan/agent/statInfo': agent,
	'GEt /dsp/statistics/agent/feePerDay': statistics,
	'GET /dsp/ad/plan/list': adList,
	'GET /dsp/ad/plan/open': pushOpen,
	'GET /dsp/ad/plan/close': pushClose,
	'GET /dsp/ad/plan/fee/update': fee,
	'GET /dsp/ad/plan/dayBudget/update': dayBudget,
	'GET /dsp/advertiser/list': advertiser,
	'GET /dsp/statistics/advertiser/data': customerData,
	'GET /dsp/finance/advert/fund/list': manageBalance,
	'GET /dsp/finance/advert/records': financeRecord,
	'GET /dsp/agent/collaborative/account/list': manageAccount,
	'GET /dsp/advertiser/add': createAdvertiser,
	'GET /dsp/advertiser/detail': editAdvertiser,
	'GET /dsp/advertiser/update': updateAdvertiser,
	'GET /dsp/ad/plan/detail': adDetail
}

