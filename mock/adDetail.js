// 广告详情 /dsp/ad/plan/detail?data={id}
export default {
	"success": true,
	"data": {
		"id": "1",
		"advertId": "10", // 广告主用户ID
		"userId": "101", // 扣款账户
		"name": "来购商场推广", // 广告计划
		"chargeType": "1", // 计费类型：1.cps
		"fee": "0.98", // 出价
		"dayBudget": "1000", // 日预算
		"couponId": "9090",// 优惠券ID
		"status": "1", // 状态:-1 删除 0.禁用 1.启用
		"auditStatus": "1", // 审核状态：-1.未通过 0.未审核 1.通过
		"beginTime": "2018-08-09", // 开始日期
		"endTime": "2018-08-10",   // 结束日期
		"createTime": "2018-08-10", // 创建时间
		"updateTime": "2018-08-10", // 更新时间
		"entName": "xxxx", // 企业名称
		"entId": "90909", // 企业ID
		"agentId": "9999", // 代理商ID
		"coupon": {
			"id": "898",
			"title": "恭喜获得【耐克】2折券", // 名称
			"remark": "恭喜获得【耐克】2折券！点击【马上使用】，进入商品页即可购买，2折抢购，全国包邮！", // 一句话说明
			"description": "<p><strong>aaaaaaaaa</strong></p><p><strong>ddddd</strong></p><p><strong>ssdsd</strong></p><ol><li><strong>sdfasdf</strong></li></ol><ul><li><strong>dafdsfsadfs</strong></li></ul>", // 描述
			"thumbnailUrl": "https://yun.duiba.com.cn/tuia/img/p835rg5rt5.jpg", // 默认缩略图
			"bannerUrl": "http://yun.duiba.com.cn/tuia/img/snqj2y7te6.jpg",  // 详情页banner
			"couponType": 2, // 1.推广链接 2.优惠码
			"inventory": "8888", // 总库存
			"curInventory": "999",// 剩余数量
			"buttonText": "马上使用", // 按钮名称
			"promoteUrl": "https://lnk0.com/FtocYp", // 推广链接
			"codeContent": "1111", // 优惠码
			"codePassword": "1111", // 密码
			"startValid": "2018-08-10", // 有效期开始
			"endValid": "2018-08-10",   // 有效期结束
			"planId": "3333", // 广告计划ID
			"createTime": "2018-08-10",
			"updateTime": "2018-08-10"
		},
		"platform": ["1"], // 1.安卓 2.ios 3.h5
		"industryIds": ["20202", "20203"], // 行业列表 映射汉字
		"regionCodes": ["0", "999"] // 地域列表 部分 全部
	}
}