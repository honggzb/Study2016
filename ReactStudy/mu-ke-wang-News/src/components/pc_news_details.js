import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, BackTop } from 'antd';

import PCNewsImagesBlock from './pc_image_block';
import CommonComments from './common_comments';

class PCNewsDetails extends Component {
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
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={14} className="container">
            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
            <hr/>
            <CommonComments uniquekey={this.props.match.params.uniquekey}/>
          </Col>
          <Col span={6}>
            <PCNewsImagesBlock count={40} type="top" width="100%" cardTitle="相关新闻" imageWidth="150px" />
          </Col>
          <Col span={2}></Col>
        </Row>
        <BackTop/>
      </div>
    );
  }
}

export default PCNewsDetails;
