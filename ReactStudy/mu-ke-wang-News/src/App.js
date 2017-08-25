import React, { Component } from 'react';

import 'antd/dist/antd.less';
import MediaQuery from 'react-responsive';
import './App.css';
import './styles/style.less';
import './styles/mobile.less';

import PCHeader from './components/pc_header';
import MyFooter from './components/myfooter';
import MobileHeader from './components/mobile_header';
import PCHome from './components/pc_home';
import MobileHome from './components/mobile_home';
import MainRoute from './components/route';

class App extends Component {
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width:1224px)'>
          <PCHeader/>
        </MediaQuery>
        <MediaQuery query='(max-device-width:1224px)'>
          <MobileHeader/>
        </MediaQuery>
        <MainRoute/>
        <MyFooter/>
      </div>
    );
  }
}

export default App;
