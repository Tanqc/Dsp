import React from 'react';
import { connect } from 'dva';
import PageComponent from '../components/app/page';

const Page = ({ location }) => {
  return (
      <PageComponent />
  );
}

export default connect()(Page);
