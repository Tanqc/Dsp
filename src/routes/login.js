import React from 'react';
import { connect } from 'dva';
import LoginComponent from '../components/login/index';

function Login({ location }) {
  return (
    <LoginComponent />
  );
}

export default Login;
