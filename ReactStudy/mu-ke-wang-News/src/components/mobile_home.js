import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Carousel} from 'antd';

import Carousel_1 from '../images/carousel_1.jpg';
import Carousel_2 from '../images/carousel_2.jpg';
import Carousel_3 from '../images/carousel_3.jpg';
import Carousel_4 from '../images/carousel_4.jpg';
import MobileNewList from './mobile_new_list';

const TabPane = Tabs.TabPane;

class MobileHome extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: 500,
      slidsToShow: 1,
      autoplay: true
    };
    return (
      <div>
        <Tabs>
            <TabPane tab="首页" key="1">
              <div className="carousel">
                <Carousel {...settings}>
                  <div><img src={Carousel_1} alt="Carouse 1"/></div>
                  <div><img src={Carousel_2} alt="Carouse 2"/></div>
                  <div><img src={Carousel_3} alt="Carouse 3"/></div>
                  <div><img src={Carousel_4} alt="Carouse 4"/></div>
                </Carousel>
              </div>
              <MobileNewList count={20} type="top"/>
            </TabPane>
            <TabPane tab="娱乐" key="2"><MobileNewList count={20} type="yule"/></TabPane>
            <TabPane tab="国内新闻" key="3"><MobileNewList count={20} type="guonei"/></TabPane>
            <TabPane tab="国际新闻" key="4"><MobileNewList count={20} type="guoji"/></TabPane>
        </Tabs>
      </div>     
    );
  }
}

export default MobileHome;
