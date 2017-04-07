import React from 'react';
import { connect } from 'dva';
import PasswordComponent from '../components/account/password';

const Password = ({ location }) => {
  return (
    <PasswordComponent />
  );
}

export default connect()(Password);
