import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import PCHome from './pc_home';
import PCNewsContainer from './pc_newscontainer';
import PCNewsDetails from './pc_news_details';
import PCUserCenter from './pc_usercenter';
import MobileNewsDetails from './mobile_news_details';
import MobileHome from './mobile_home';
import MobileUserCenter from './mobile_usercenter'

class MainRoute extends Component {
  render() {
    return (
        <div>
          <MediaQuery query='(min-device-width:1224px)'>
          <Switch>
            <Route exact path="/" component={PCNewsContainer}/>
            <Route path="/details/:uniquekey" component={PCNewsDetails}/>
            <Route path="/usercenter" component={PCUserCenter}/>
            </Switch>
          </MediaQuery>
          <Switch>
          <MediaQuery query='(max-device-width:1224px)'>
            <Route exact path="/" component={MobileHome}/>
            <Route path="/details/:uniquekey" component={MobileNewsDetails}/>
            <Route path="/usercenter" component={MobileUserCenter}/>
          </MediaQuery>
        </Switch>
        </div>
    );
  }
}
export default MainRoute;