/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  创建广告计划
 */
 
import * as adDetailService from '../services/adDetail';
import * as createPlanService from '../services/createPlan';
import { browserHistory } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import moment from 'moment';

export default {
  namespace: 'createPlan',
  state: {
    createLoading: false,
    platform: ["1", "2", "3"],
    regionCodes: '11,12,1306,1309,1308,1304,1311,1310,1303,1301,1302,1305,1307,13,1402,1405,1407,1410,1411,1406,1401,1409,1403,1408,1404,14,1529,1508,1502,1504,1506,1501,1507,1505,1503,1509,1525,1522,15,80,2103,2105,2113,2102,2106,2104,2109,2114,2107,2110,2111,2101,2112,2108,21,2208,2206,2202,2204,2203,2207,2205,2224,2201,22,2306,2327,2301,2304,2311,2303,2308,2310,2309,2302,2305,2312,2307,23,81,31,3204,3208,3207,3201,3206,3205,3212,3202,3213,3203,3209,3210,3211,32,3301,3305,3304,3307,3311,3302,3308,3306,3310,3303,3309,33,3408,3403,3416,3417,3411,3412,3401,3406,3404,3410,3415,3405,3407,3402,3413,3418,34,3501,3508,3507,3509,3503,3505,3504,3502,3506,35,3610,3607,3608,3602,3604,3601,3603,3611,3605,3609,3606,36,3716,3714,3705,3717,3701,3708,3712,3715,3713,3702,3711,3709,3710,3707,3706,3704,3703,37,82,4105,4106,4108,4102,4111,4103,4113,4104,4109,4112,4114,4107,4115,4110,4101,4116,4117,4190,41,4207,4211,4202,4208,4210,4203,4213,4201,4212,4206,4209,4205,4228,4290,42,4307,4310,4304,4312,4313,4305,4303,4331,4309,4311,4306,4308,4301,4302,43,83,4451,4419,4406,4401,4416,4413,4407,4452,4409,4414,4418,4405,4415,4402,4403,4417,4453,4408,4412,4420,4404,44,4510,4505,4514,4506,4508,4503,4512,4511,4513,4502,4501,4507,4504,4509,45,4601,4602,4603,4604,4690,46,84,50,5132,5119,5101,5117,5106,5133,5116,5108,5111,5134,5105,5114,5107,5113,5110,5104,5109,5118,5115,5120,5103,51,5204,5205,5201,5202,5226,5227,5223,5206,5203,52,5305,5323,5329,5331,5334,5325,5301,5307,5309,5333,5308,5303,5326,5328,5304,5306,53,5425,5403,5401,5404,5424,5402,5422,54,85,6109,6103,6107,6110,6102,6105,6101,6104,6106,6108,61,6204,6211,6230,6202,6203,6209,6201,6229,6212,6208,6210,6205,6206,6207,62,6326,6302,6322,6323,6325,6328,6301,6327,63,6404,6402,6403,6401,6405,64,6529,6543,6528,6527,6523,6522,6532,6531,6502,6542,6504,6501,6540,6530,6590,65,86,8100,8200,7101,7105,7117,7104,7114,7115,7111,7103,7107,7109,7113,7110,7118,7102,7106,7112,7121,7108,7119,7120,7116,7122,71,87,10,999,0',
    industryIds: [],
    effectDaterange: "",
    validTime: "",
    action: "",
    areas: null,
    industry: null,
    type: 1
  },
  reducers: {
    setLoading(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    setValue(state, action) {
      return {}
    },
    save(state, action) {
      const { coupon } = action.payload;
      const effectDaterange = [moment(action.payload.beginTime), moment(action.payload.endTime)];
      const validTime = [moment(coupon.startValid), moment(coupon.endValid)];
      const regionCodes = action.payload.regionCodes.join(',');
      return {
        ...state,
        ...coupon,
        ...action.payload,
        effectDaterange,
        validTime,
        regionCodes
      }
    },
    queryAreasSuccess(state, action) {
      return { ...state, ...action.payload } 
    },
    queryIndustrySuccess(state, action) {
      return { ...state, ...action.payload }
    },
    setAction(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    setIndustryIds(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    setRegion(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    setCouponType(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    setName(state, action) {
      return {
        ...state,
        ...action
      }
    }
  },
  effects: {
    *submit({ payload }, { call, put }) {
      const { data } = yield call(createPlanService.submit, { payload });
      yield put({ type: 'setLoading', payload: { createLoading: false }});

      if (data.success) {
        message.success('创建成功');
        browserHistory.push('/page/adList');
        return;
      }
      message.error(data.msg || '系统错误，请重试');
    },
    *modify({ payload }, { call, put }) {
      const { data } = yield call(createPlanService.modify, { payload });
      yield put({ type: 'setLoading', payload: { createLoading: false }});
      if (data.success) {
        message.success('更新成功');
        browserHistory.push('/page/adList');
        return;
      }
      message.error(data.msg || '系统错误，请重试');
    },
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(adDetailService.fetch, { payload });
      if (data) {
        const result = data.data;
        yield put({
          type: 'save',
          payload: {
            ...result
          }
        })
      }
    },
    *queryAreas({ payload: {} }, { select, call, put }) {
      const { data } = yield call(createPlanService.fetchAreas);
      if (data) {
        yield put({
          type: 'queryAreasSuccess',
          payload: {
            areas: data.data
          }
        })
      }
    },
    *queryIndustry({ payload: {} }, { select, call, put }) {
      const { data } = yield call(createPlanService.fetchIndustry);
      if (data) {
        yield put({
          type: 'queryIndustrySuccess',
          payload: {
            industry: data.data
          }
        })
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const edit = pathToRegexp('/page/ad/edit/:id').exec(pathname);
        dispatch({ type: 'setAction', payload: {
          createLoading: false,
          platform: ["1", "2", "3"],
          regionCodes: '11,12,1306,1309,1308,1304,1311,1310,1303,1301,1302,1305,1307,13,1402,1405,1407,1410,1411,1406,1401,1409,1403,1408,1404,14,1529,1508,1502,1504,1506,1501,1507,1505,1503,1509,1525,1522,15,80,2103,2105,2113,2102,2106,2104,2109,2114,2107,2110,2111,2101,2112,2108,21,2208,2206,2202,2204,2203,2207,2205,2224,2201,22,2306,2327,2301,2304,2311,2303,2308,2310,2309,2302,2305,2312,2307,23,81,31,3204,3208,3207,3201,3206,3205,3212,3202,3213,3203,3209,3210,3211,32,3301,3305,3304,3307,3311,3302,3308,3306,3310,3303,3309,33,3408,3403,3416,3417,3411,3412,3401,3406,3404,3410,3415,3405,3407,3402,3413,3418,34,3501,3508,3507,3509,3503,3505,3504,3502,3506,35,3610,3607,3608,3602,3604,3601,3603,3611,3605,3609,3606,36,3716,3714,3705,3717,3701,3708,3712,3715,3713,3702,3711,3709,3710,3707,3706,3704,3703,37,82,4105,4106,4108,4102,4111,4103,4113,4104,4109,4112,4114,4107,4115,4110,4101,4116,4117,4190,41,4207,4211,4202,4208,4210,4203,4213,4201,4212,4206,4209,4205,4228,4290,42,4307,4310,4304,4312,4313,4305,4303,4331,4309,4311,4306,4308,4301,4302,43,83,4451,4419,4406,4401,4416,4413,4407,4452,4409,4414,4418,4405,4415,4402,4403,4417,4453,4408,4412,4420,4404,44,4510,4505,4514,4506,4508,4503,4512,4511,4513,4502,4501,4507,4504,4509,45,4601,4602,4603,4604,4690,46,84,50,5132,5119,5101,5117,5106,5133,5116,5108,5111,5134,5105,5114,5107,5113,5110,5104,5109,5118,5115,5120,5103,51,5204,5205,5201,5202,5226,5227,5223,5206,5203,52,5305,5323,5329,5331,5334,5325,5301,5307,5309,5333,5308,5303,5326,5328,5304,5306,53,5425,5403,5401,5404,5424,5402,5422,54,85,6109,6103,6107,6110,6102,6105,6101,6104,6106,6108,61,6204,6211,6230,6202,6203,6209,6201,6229,6212,6208,6210,6205,6206,6207,62,6326,6302,6322,6323,6325,6328,6301,6327,63,6404,6402,6403,6401,6405,64,6529,6543,6528,6527,6523,6522,6532,6531,6502,6542,6504,6501,6540,6530,6590,65,86,8100,8200,7101,7105,7117,7104,7114,7115,7111,7103,7107,7109,7113,7110,7118,7102,7106,7112,7121,7108,7119,7120,7116,7122,71,87,10,999,0',
          industryIds: [],
          effectDaterange: "",
          validTime: "",
          action: "",
          areas: null,
          industry: null,
          type: 1
        } });
        dispatch({
          type: 'queryAreas',
          payload: {}
        });
        dispatch({
          type: 'queryIndustry',
          payload: {}
        });
          
        if (edit) {
          dispatch({
            type: 'fetch',
            payload: JSON.stringify({
              id: edit[1]
            })
          });
          dispatch({ type: 'setAction', payload: {action: 'edit'} })
        }

      })
    }
  }
};
