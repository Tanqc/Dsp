/**
 * @authors tanqichao
 * @date    2017-03-21 13:59:27
 * @module  广告计划创建&编辑
 */

import { Row, Col, Form, Input, Radio, Button, DatePicker, Checkbox, Tabs } from 'antd';
import React, { Component, PropTypes } from 'react';
import Styles from './createPlan/index.less';
import ReactQuill from '../plugin/react-quill';
import RegionModal from './item/regionModal';
import ImgUpload from '../plugin/imgUpload';
import Industry from './item/industry';
// import LzEditor from 'react-lz-editor'
import moment from 'moment';

const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 8}
};

class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			validateTime: {
				validateStatus: '',
				help: ''
			},
			endTime: '',
			endValid: '',
			beginTime: '',
			startValid: '',
			description: '',
			industryIds: [],
			thumbnailUrl: '',
			bannerUrl: ''
		}
	}

	// 表单修改
	modify = () => {
		const state = this.state;
		this.props.form.validateFields((error, values) => {
			if (error) return ;
			const params = Object.assign(values, {
				id: this.props.id,
				endTime: state.endTime || this.props.endTime,
				endValid: state.endValid || this.props.endValid,
				beginTime: state.beginTime || this.props.beginTime,
				startValid: state.startValid || this.props.startValid,
				description: state.description || this.props.description,
				thumbnailUrl: state.thumbnailUrl || this.props.thumbnailUrl,
				bannerUrl: state.bannerUrl || this.props.bannerUrl
			}, {
				regionCodes: this.props.regionCodes.split(','),
				industryIds: this.props.industryIds
			});
			console.log(params)
			this.props.dispatch({ type: 'createPlan/setLoading', payload: { createLoading: true }});
			this.props.dispatch({
				type: 'createPlan/modify',
				payload: JSON.stringify(params)
			})
		})
	}

	// 表单提交
	submit = () => {
		const state = this.state;
		this.props.form.validateFields((error, values) => {
			if (error) return ;
			const params = Object.assign(values, {
				endTime: state.endTime,
				endValid: state.endValid,
				beginTime: state.beginTime,
				startValid: state.startValid,
				description: state.description,
				thumbnailUrl: state.thumbnailUrl,
				bannerUrl: state.bannerUrl
			}, {
				regionCodes: this.props.regionCodes.split(','),
				industryIds: this.props.industryIds
			});
			console.log(params);
			this.props.dispatch({ type: 'createPlan/setLoading', payload: { createLoading: true }});
			this.props.dispatch({
				type: 'createPlan/submit',
				payload: JSON.stringify(params)
			})
		})
	}

	// 广告出价
	validateFee = (rule, value, callback) => {
		if (value && Number(value) < 0.4) {
			callback('不小于0.4的数字，保留小数点后2位')
		}
		callback()
	}

	// 每日预算
	validateDayBudget = (rule, value, callback) => {
		if (value && Number(value) < 100) {
			callback('不能低于100')
		}
		callback()
	}
	// 投放日期
	initEffectDaterange = () => {
		const rangetime = [moment("2018-09-09"), moment("2018-09-09")];
		return rangetime;
	}
	setEffectDaterange = (value, dateString) => {
		this.setState({
			beginTime: dateString[0],
			endTime: dateString[1]
		})
	}
	// 投放区域
	setRegion = (values) => {
		this.props.dispatch({
			type: "createPlan/setRegion",
			payload: {
				regionCodes: values
			}
		})
	}
	// 商品说明
	setDescription = (html) => {
		this.setState({
			description: html
		})
	}
	// 选择优惠码内容
	setCouponCode = (e) => {
		this.props.dispatch({
			type: "createPlan/setCouponType",
			payload: {
				type: e.target.value
			}
		})
	}
	// 行业标签
	setIndustryIds = (industryIds) => {
		console.log(industryIds);
		this.props.dispatch({
      type: 'createPlan/setIndustryIds',
      payload: {
        industryIds: industryIds
      }
    })
	}
	// 优惠码信息-设置有效期
	setValidTime = (value, dateString) => {
		// console.log(moment(dateString[1]) - moment(dateString[0]))
		this.setState({
			startValid: dateString[0],
			endValid: dateString[1]
		})
	}
	// 可重复使用码
	createRepCouponCode = () => {
		const  { getFieldDecorator } = this.props.form;
		const action = this.props.action;
		const content = (
			<div>
				<FormItem
					label="优惠码"
					{...formItemLayout}
				>
					{getFieldDecorator('codeContent', {
						initialValue: action ? this.props.codeContent : ''
					})(
						<Input placeholder="请输入优惠码，必填" />
					)}
				</FormItem>
				<FormItem
					label="密码"
					{...formItemLayout}
				>
					{getFieldDecorator('codePassword', {
						initialValue: action ? this.props.codePassword : ''
					})(
    				<Input placeholder="请输入密码，如没有可不填" />	
    			)}
				</FormItem>
			</div>
		);
		return content;
	}
	// 缩略图
	handleThumbnailUrl = (url) => {
		this.setState({
			thumbnailUrl: url
		})
	}
	// Banner
	handleBannerUrl = (url) => {
		console.log(url);

		this.setState({
			bannerUrl: url
		})
	}
	renderTitle = () => {
    if (this.props.regionCodes.indexOf('10') > -1 && this.props.regionCodes.indexOf('999') > -1) {
      return '全部地域';
    }
    return '部分地域';
	}

	// 优惠券数量
	createDom = () => {
		// const {this.props} = this.props;
		const { getFieldDecorator } = this.props.form;
		// 投放平台
		const platformsOptions = [
			{ label: 'Android', value: '1' },
			{ label: 'IOS', value: '2' },
			{ label: 'H5', value: '3' }
		];
		const action = this.props.action;
		return (
			<Form>
				<FormItem
					label="推广计划名称"
					{...formItemLayout}
				>
	        {getFieldDecorator('name', {
	        	initialValue: action ? this.props.name : '',
	          rules: [{ 
	          	required: true,
	          	message: '请填写推广计划名称'
	          }]
	        })(
	          <Input placeholder="不超过20个字" maxLength={20} />
	        )}
	      </FormItem>
				<FormItem
					label="计费方式"
					{...formItemLayout}
				>
					{getFieldDecorator('chargeType', {
						initialValue: "1"
					})(
						<RadioGroup>
							<Radio value="1">CPC（按点击计费）</Radio>
						</RadioGroup>
	        )}
				</FormItem>
				<FormItem
					label="广告出价"
					{...formItemLayout}
				>
					{getFieldDecorator('fee', {
						initialValue: action ? this.props.fee : '',
						rules: [{
							required: true,
							message: '请填写广告出价'
						}, {
							validator: this.validateFee
						}]
					})(
						<Input placeholder="每一次有效点击的付费金额，填写不小于0.4" addonAfter="元" />
					)}
				</FormItem>
				<FormItem
					label="每日预算"
					{...formItemLayout}
				>
					{getFieldDecorator('dayBudget', {
						initialValue: action ? this.props.dayBudget : '',
						rules: [{
							required: true,
							message: '请填写每日预算'
						}, {
							validator: this.validateDayBudget
						}]
					})(
						<Input placeholder="每天的消费金额上限，不填则不限，填写则必须高于100" addonAfter="元" />
					)}
				</FormItem>
				<FormItem
					label="投放平台"
					{...formItemLayout}
				>
					{getFieldDecorator('platforms', {
						initialValue: this.props.platform.toString().split(","),
						rules: [{
							required: true,
							message: '至少选择一项'
						}]
					})(
						<CheckboxGroup options={platformsOptions} />
					)}
				</FormItem>
				<FormItem
					label="投放日期"
					{...formItemLayout}
				>
					{getFieldDecorator('effectDaterange', {
						initialValue: this.props.effectDaterange,
						rules: [{
							type: 'array',
							required: true,
							message: '请选择投放日期'
						}],
						onChange: this.setEffectDaterange
					})(
						<RangePicker />
					)}
				</FormItem>
				<FormItem
					label="投放区域"
					{...formItemLayout}
				>
					<p className={Styles.regionCodes}>
						<span>{this.renderTitle()}</span>
						<RegionModal onComplete={this.setRegion} {...this.props}>
							<span className={Styles.changeRegion}>更改</span>
						</RegionModal>
						<span>Tips：定向条件将影响广告计划的用户曝光数量</span>
					</p>
				</FormItem>
				<div className={Styles.title}>推广链接</div>
				<FormItem
					label="推广链接"
					{...formItemLayout}
				>
	        {getFieldDecorator('promoteUrl', {
	        	initialValue: action ? this.props.promoteUrl : '',
	          rules: [{
	          	required: true,
	          	message: '请输入推广链接'
	          }],
	        })(
	          <Input placeholder="请输入欲推广的网址链接" />
	        )}
	      </FormItem>
	      <div className={Styles.title}>优惠券描述</div>
	      <FormItem
					label="商品名称"
					{...formItemLayout}
				>
	        {getFieldDecorator('couponTitle', {
	        	initialValue: action ? this.props.couponTitle : '',
	          rules: [{
	          	required: true,
	          	message: '请输入商品名称'
	          }],
	        })(
	          <Input placeholder="请设置展示给用户的商品名称，不得超过12个字" maxLength={12} />
	        )}
	      </FormItem>
				<FormItem
					label="商品说明"
					{...formItemLayout}
				>
	        <ReactQuill
	        	initVal={action ? this.props.description : ''}
	        	onComplete={this.setDescription}
	      	/>
	      </FormItem>
	      <FormItem
					label="一句话描述"
					{...formItemLayout}
				>
					{getFieldDecorator('couponRemark', {
						initialValue: action ? this.props.couponRemark : '',
						rules: [{
	          	required: true,
	          	message: '请输入描述'
	          }]
					})(
	        	<Input type="textarea" className={Styles.textarea}  maxLength={60} placeholder="请描述产品或服务卖点，不超过60个字" />
					)}
	      </FormItem>
	      <FormItem
					label="商品图片"
					{...formItemLayout}
				>
	        <Tabs defaultActiveKey="1">
				    <TabPane tab="默认缩略图" key="1">
				    	<p>225*140px，格式为jpg、png、jpeg，大小不大于1M。</p>
				    	<ImgUpload initUrl={action ? this.props.thumbnailUrl : ''} onComplete={this.handleThumbnailUrl} />
				    </TabPane>
				    <TabPane tab="详情页Banner" key="2">
				    	<p>640*300px，格式为jpg、png、jpeg，大小不大于1M。</p>
				    	<ImgUpload initUrl={action ? this.props.bannerUrl : ''} onComplete={this.handleBannerUrl} />
				    </TabPane>
				  </Tabs>
	      </FormItem>
	      <FormItem
					label="标签"
					labelCol = {{ span: 4 }}
					wrapperCol = {{ span: 20}}
				>
	      	<Industry
	      		{...this.props}
	      		onComplete={this.setIndustryIds}
	      	/>
	      </FormItem>
	      <div className={Styles.title}>优惠码信息</div>
				<FormItem
					required
					label="设置有效期"
					validateStatus={this.state.validateTime.validateStatus}
					help={this.state.validateTime.help}
					{...formItemLayout}
				>
					{getFieldDecorator('validTime', {
						initialValue: action ? this.props.validTime : '',
						rules: [{
							type: 'array',
							required: true,
							message: '请设置有效期'
						}],
						onChange: this.setValidTime
					})(
						<RangePicker />
					)}
				</FormItem>
				<FormItem
					label="优惠码内容"
					{...formItemLayout}
				>
					{getFieldDecorator('type', {
						initialValue: this.props.type
					})(
						<RadioGroup onChange={this.setCouponCode} disabled={this.props.action === 'edit' ? true : false}>
			        <Radio value={1}>推广链接</Radio>
			        <Radio value={2}>可重复使用码</Radio>
			      </RadioGroup>
					)}
	      </FormItem>
	      {	
	      	this.props.type === 2 ? this.createRepCouponCode() : null
	      }
	      <FormItem
	  			label="优惠券数量"
	  			{...formItemLayout}
	  		>
	  			{getFieldDecorator('inventory', {
	  				initialValue: action ? this.props.inventory : '',
	  				rules: [{
	          	required: true,
	          	message: '请输入优惠券数量'
	          }]
	  			})(
	  				<Input placeholder="请输入优惠券数量" />
	  			)}
	  		</FormItem>
	  		<Row>
	  			<Col span={4}></Col>
	  			<Col span={8}>
	  				{
	  					this.props.action === 'edit' ? <Button type="primary" onClick={this.modify} loading={this.props.createLoading}>确认修改</Button> : 
	  						<Button type="primary" onClick={this.submit} loading={this.props.createLoading}>提交审核</Button>
	  				}
	  			</Col>
	  		</Row>
			</Form>
		)
	}

	render () {
		return (
			<div>
				{ this.createDom() }
			</div>
		)
	}
};

export default Form.create()(Detail);
