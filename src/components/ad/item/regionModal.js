/**
 * @authors tanqichao
 * @date    2017-03-21 15:59:36
 * @module  投放区域
 */
 
import { Modal, Checkbox, Tree } from 'antd';
import React, { Component } from 'react';
import Styles from './regionModal.less';

const CheckboxGroup = Checkbox.Group;
const TreeNode = Tree.TreeNode;

class RegionModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			regionCodes: []
		}
	}
	// 显示
	showModelHandler = (e) => {
		if (e) e.stopPropagation();
		this.setState({
			visible: true
		})
	}
	// 隐藏
	hideModalHandler = () => {
		this.setState({
			visible: false
		})
	}
	// 确定
	okHandler = () => {
		const { onComplete } = this.props;
		onComplete(this.state.regionCodes.join(','));
		this.hideModalHandler();
	}
  onCheck = (checkedKeys) => {
  	console.log(checkedKeys)
  	this.setState({
  		regionCodes: checkedKeys
  	})
  }
	createDom = () => {
// console.log(this.props);
		const areas = this.props.areas;
		const regionCodes  = this.props.regionCodes.split(',');
		if (areas) {
			const loop = data => data.map((item) => {
				if (item.children && item.children.length) {
	        return <TreeNode key={item.code} title={item.name}>{loop(item.children)}</TreeNode>
	      }
	      return <TreeNode key={item.code} title={item.name} />
			})
			return (
				<Tree
		    	checkable
		    	defaultCheckedKeys={regionCodes}
		    	defaultExpandedKeys={['10', '999', '80', '81', '82', '83', '84', '85', '86']}
        	onCheck={this.onCheck}
		    >
					{ loop(areas) }
				</Tree>
			)
		}
	}
	render () {
		const { children } = this.props;
		return (
			<span>
				<span onClick={this.showModelHandler}>
        	{ children }
      	</span>
      	<Modal
      		title="选择投放区域"
      		visible={this.state.visible}
      		onOk={this.okHandler}
      		onCancel={this.hideModalHandler}
      	>
		      { this.createDom() }
      	</Modal>
			</span>
		);
	}
};

export default RegionModal;
