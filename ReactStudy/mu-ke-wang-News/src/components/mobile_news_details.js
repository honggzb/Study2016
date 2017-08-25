import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, BackTop } from 'antd';

import PCNewsImagesBlock from './pc_image_block';
import CommonComments from './common_comments'

class MobileNewsDetails extends Component {
  constructor(){
    super();
    this.state = {
      newsItem: ''
    }
  }
  
  componentDidMount(){
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({ newsItem: json });
        document.title = this.state.newsItem.title+" - React News | React 驱动的新闻平台"
      });
  }

  createMarkup(){
    return {__html: this.state.newsItem.pagecontent};
  }
  
  render() {
    const {newsItem} = this.state;
    return (
      <div className="ucmobileList">
        <Row>
          <Col span={24} className="container">
            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
            <hr/>
            <CommonComments uniquekey={this.props.match.params.uniquekey}/>
          </Col>
        </Row>
        <BackTop/>
      </div>
    );
  }
}

export default MobileNewsDetails;
