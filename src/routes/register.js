import React from 'react';
import { connect } from 'dva';
import RegisterComponent from '../components/login/register';

const Register = ({ location }) => {
  return (
      <RegisterComponent />
  );
}

export default connect()(Register);
