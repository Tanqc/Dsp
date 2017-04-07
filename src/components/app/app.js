import React, { PropTypes } from 'react';
import Styles from './common.less';

class App extends React.Component {
	constructor (props) {
		super(props)
	}

	render () {
		return (
			<div	className={Styles.app}>
				{this.props.children}
			</div>
		)
	}
};

App.propTypes = {
	children: PropTypes.element
};

export default App;