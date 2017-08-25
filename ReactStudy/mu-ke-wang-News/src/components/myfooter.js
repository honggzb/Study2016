import React, { Component } from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

class MyFooter extends Component {
  render() {
    return (
      <Footer theme="dark" style={{ textAlign: 'center' }}>
        &copy;&nbsp;2017 ReacNews. All Rights Reserved.
      </Footer>
    );
  }
}

export default MyFooter;
