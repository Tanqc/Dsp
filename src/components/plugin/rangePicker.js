import moment from 'moment';
import 'moment/locale/zh-cn';
import { createForm } from 'rc-form';
import Styles from './rangePicker.less';
import { Form, DatePicker, Radio } from 'antd';
import React, { Component, PropTypes } from 'react';

moment.locale('zh-cn');

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { RangePicker } = DatePicker;

class TimeRangePicker extends Component {
	static propTypes = {
    form: React.PropTypes.object,
    onComplete: React.PropTypes.func
  }
	constructor(props) {
		super(props);
		this.state = {
			stage: 'today',
			beginTime: moment(),
			endTime: moment()
		}
	}
	handleStage = (e) => {
		let beginTime = '',
				endTime = '';
		const { onComplete } = this.props;
		const currentTime = e.target.value;
		switch (currentTime) {
			case 'today':
				beginTime = moment();
				endTime = moment();
				break;
			case 'yesterday':
				beginTime = moment().subtract(1, 'days');
				endTime = moment().subtract(1, 'days');
				break;
			case 'lastWeek':
				endTime = moment();
				beginTime = moment().subtract(7, 'days');
				break;
			case 'lastMonth':
				endTime = moment();
				beginTime = moment().subtract(30, 'days');
				break;
			default:;
		}
		this.setState({
			beginTime: beginTime,
			endTime: endTime,
			stage: currentTime
		});
		onComplete(beginTime, endTime);
	}
	handlePicker = (dates, dateStrings) => {
		const { onComplete } = this.props;
		this.setState({
			beginTime: dates[0],
			endTime: dates[1],
			stage: ''
		});
		onComplete(dates[0], dates[1]);
	}
	render () {
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<FormItem>
						<RadioGroup
							className={Styles.mr5}
							value={this.state.stage}
							onChange={this.handleStage}
						>
				      <RadioButton value="today">今天</RadioButton>
				      <RadioButton value="yesterday">昨天</RadioButton>
				      <RadioButton value="lastWeek">最近7天</RadioButton>
				      <RadioButton value="lastMonth">最近30天</RadioButton>
				    </RadioGroup>
		    </FormItem>
		    <FormItem>
		    	<RangePicker
		    		onChange={this.handlePicker}
		    		value={[this.state.beginTime, this.state.endTime]}
		    	/>
		    </FormItem>
		  </div>
		)
	}
};

export default TimeRangePicker;