import React, {Component, PropTypes} from 'react';
import SliderBar from '../layout/sliderBar';
import Header from '../layout/header';
import Styles from './common.less';
import { Row, Col } from 'antd';
import { connect } from 'dva';

class Page extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch({ type: 'indexPage/fetchBalance' });
    this.props.dispatch({ type: 'indexPage/fetchAdvert' });
    this.props.dispatch({ type: 'indexPage/fetchAgent' });
    this.props.dispatch({ type: 'indexPage/getAccountInfo' });
  }

  render() {
    return (
      <div className={Styles.page}>
        <Header {...this.props} />
        <Row className={Styles.content}>
          <Col span={3} style={{height: '100%'}}>
            <SliderBar />
          </Col>
          <Col span={21}>
            <div className={Styles.main}>
              {this.props.children}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
};

Page.propTypes = {
  children: PropTypes.element
};

export default connect((state) => {
  const { bindList, account, permissions } = state.indexPage;
  return {
    account,
    bindList,
    permissions
  }
})(Page)