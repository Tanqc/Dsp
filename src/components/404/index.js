import React, { Component } from 'react';
import { Link } from 'dva/router';

class NotFound extends Component {
  render () {
    return (
      <h2 style={{textAlign: 'center', paddingTop: 50}}>NotFound<Link to="/login">点我</Link></h2>
    )
  }
}

export default NotFound;
