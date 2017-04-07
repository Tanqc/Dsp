// 首页数据统计
export default {
	"success": true,
	"data": {
		"totalExposureCount": 1000, //总曝光数目
    "totalClickCount": 1000, //总点击数目
    "totalClickRate": 1000, //总点击率
    "avgPrice": 0.05, //点击均价
    "totalConsumeTotal": 1000, //总消耗
	  "list": [ //按日统计列表
	  	{
		  	"curDate": "2017-03-16", //时间
			  "exposureCount": 500, //曝光数目
			  "clickCount": 500, //点击数目
		    "clickRate": "100%", //点击率
		    "avgPrice": 500, //点击均价
		    "consumeTotal": 500 //总消耗
	  	},
	  	{
		  	"curDate": "2017-03-17", //时间
			  "exposureCount": 400, //曝光数目
			  "clickCount": 400, //点击数目
		    "clickRate": "40%", //点击率
		    "avgPrice": 400, //点击均价
		    "consumeTotal": 400 //总消耗
	  	}
	  ]
	}
}