import React, { Component } from 'react';
import { Tabs, Carousel , Row, Col , BackTop} from 'antd';

import Carousel_1 from '../images/carousel_1.jpg';
import Carousel_2 from '../images/carousel_2.jpg';
import Carousel_3 from '../images/carousel_3.jpg';
import Carousel_4 from '../images/carousel_4.jpg';
import PCNewsBlock from './pc_news_block';
import PCNewsImagesBlock from './pc_image_block';

const TabPane = Tabs.TabPane;

class PCNewsContainer extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: 500,
      slidsToShow: 1,
      autoplay: true
    };
    return (
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="container">
            <div className="leftContainer">
              <div className="carousel">
                <Carousel {...settings}>
                  <div><img src={Carousel_1} alt="Carouse 1"/></div>
                  <div><img src={Carousel_2} alt="Carouse 2"/></div>
                  <div><img src={Carousel_3} alt="Carouse 3"/></div>
                  <div><img src={Carousel_4} alt="Carouse 4"/></div>
                </Carousel>
              </div>
              <PCNewsImagesBlock count={6} type="guoji" width="500px" cardTitle="国际头条" imageWidth="120px"/>
            </div>
            <Tabs className="tabs_news">
              <TabPane tab="头条新闻" key="1">
                <PCNewsBlock count={22} type="top" width="100%" bordered="false"/>
              </TabPane>
              <TabPane tab="国际新闻" key="2">
                <PCNewsBlock count={22} type="guoji" width="100%" bordered="false"/>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>
        <BackTop/>
      </div>
    );
  }
}

export default PCNewsContainer;
