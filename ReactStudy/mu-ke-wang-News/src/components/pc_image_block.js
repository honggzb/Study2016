import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

class PCNewsImagesBlock extends Component {
  constructor(){
    super();
    this.state = {
      news: ''
    }
  }
  
  componentWillMount(){
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.props.count, myFetchOptions)
      .then(response => response.json())
      .then(json => this.setState({ news: json }));
  }
  
  render() {
    const {news} = this.state;
    const styleImage = {
      display: "block",
      width: this.props.imageWidth,
      height: "90px"
    };
    const styleH3 = {
      width: this.props.imageWidth,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    };
    const newsList = news.length ?
      news.map((newsItem, index) => (
        <div key={index} className="imageblock">
          <Link to={`details/${newsItem.uniquekey}`} target="_blank"/>
          <div className="custom-image"><img alt="" style={styleImage} src={newsItem.thumbnail_pic_s} /></div>
          <div className="custom-card">
              <h3 style={styleH3}>{newsItem.title}</h3>
              <p>{newsItem.author_name}</p>
          </div>
        </div>
      )): '没有加载到图片！'
    return (
      <div className="topNewsList">
        <Card title={this.props.cardTitle} bordered={true} style={{width: this.props.width}}>
            {newsList}
        </Card>
      </div>
    );
  }
}

export default PCNewsImagesBlock;
