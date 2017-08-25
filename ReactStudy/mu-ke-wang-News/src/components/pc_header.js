import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../images/logo.png';
import { Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal } from 'antd';
import { Row, Col } from 'antd';
import PCNewsContainer from './pc_newscontainer';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends Component {
  constructor() {
    super();
    this.state = {
      current: 'home',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userId: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  setModalVisible(modalVisible) {
   this.setState({ modalVisible });
 }
 
  handleClick(e){
    if(e.key=="register"){
      this.setState({current: 'register'});
      this.setModalVisible(true);
    }else {
      this.setState({current: e.key})
    }
  }
  
  handleSubmit(e){
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET'
    };
    var formData = this.props.form.getFieldsValue();
    console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_username + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmpassword, myFetchOptions)
      .then(response =>  response.json())
      .then(json => {
        this.setState({userNickName: json.NickUserName, userId: json.UserId});
        localStorage.userid = json.UserId;
        localStorage.userNickName = json.NickUserName;
        console.log(json);
        console.log(localStorage.userid, localStorage.userNickName);
      });
      if(this.state.action == "login"){
        this.setState({hasLogined: true})
      }
    message.success("请求成功！");
    this.setModalVisible(false);
  }
  
  callback(key){
    if(key == 1){
      this.setState({action: 'login'});
    }else if(key == 2){
      this.setState({action: 'register'});
    }
  }
  
  logout(){
    localStorage.userid = '';
    localStorage.userNickName = '';
    this.setState({hasLogined: false});
  }
  
  render() {
    let {getFieldProps} = this.props.form;
    const userShow = this.state.hasLogined ? 
      <Menu.Item key="logout" class="register">
        <Button type="primary" htmlType="button">{this.state.userNickName}</Button>&nbsp;&nbsp;
        <Link to="/usercenter"><Button type="dashed" htmlType="button">个人中心</Button></Link>&nbsp;&nbsp;
        <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
      </Menu.Item> : 
      <Menu.Item key="register" class="register">
        <Icon type="appstore" />注册/登录
      </Menu.Item>;
    return (
        <Row>
          <Col span={2}>
            <Link to='/'><img className="logo" src={Logo} alt={"Logo"} /></Link>
          </Col>
          <Col span={4} className="logoText">
            <p><Link to='/'>ReactNews</Link></p>
          </Col>
          <Col span={18}>
            <Menu
              onClick={this.handleClick.bind(this)}
              selectedKeys={[this.state.current]}
              mode="horizontal"
             >
                <Menu.Item key="home"><Icon type="appstore" /><Link to='/'>首页</Link></Menu.Item>
                <Menu.Item key="list"><Icon type="appstore" /><Link to='/list'>List</Link></Menu.Item>
                <Menu.Item key="firstfavoror"><Icon type="appstore" /><Link to='/'>头条</Link></Menu.Item>
                <Menu.Item key="entertrance"><Icon type="appstore" /><Link to='/'>娱乐</Link></Menu.Item>
                <Menu.Item key="techonology"><Icon type="appstore" /><Link to='/'>科技</Link></Menu.Item>
                <Menu.Item key="fashion"><Icon type="appstore" /><Link to='/'>时尚</Link></Menu.Item>
                {userShow}
            </Menu>
          </Col>
          <Modal
            title="用户中心"
            wrapClassName="vertical-center-modal"
            visible={this.state.modalVisible}
            onOk={()=>this.setModalVisible(false)} okText="关闭"
            onCancel={()=>this.setModalVisible(false)}
          >
            <Tabs type="card" onChange={this.callback.bind(this)}>
              <TabPane tab="登录" key="1">
                <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                  <FormItem label="账户"><Input placeholder="请输入您的账号" {...getFieldProps('userName')} /></FormItem>
                  <FormItem type="password" label="密码"><Input placeholder="请输入您的密码" {...getFieldProps('password')} /></FormItem>
                  <Button type="primary" htmlType="submit">登录</Button>
                </Form>
              </TabPane>
              <TabPane tab="注册" key="2" >
                <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                  <FormItem label="账户"><Input placeholder="请输入您的账号" {...getFieldProps('r_username')} /></FormItem>
                  <FormItem type="password" label="密码"><Input placeholder="请输入您的密码" {...getFieldProps('r_password')} /></FormItem>
                  <FormItem type="password" label="确认密码"><Input placeholder="请再次输入您的密码" {...getFieldProps('r_confirmpassword')} /></FormItem>
                  <Button type="primary" htmlType="submit">注册</Button>
                </Form>
              </TabPane>
            </Tabs>
          </Modal>
        </Row>
    );
  }
}

export default PCHeader = Form.create({})(PCHeader);
