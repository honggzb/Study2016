import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../images/logo.png';
import { Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal } from 'antd';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends Component {
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
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username-username&password=password&r_username="+formData.r_username+"&r_password"+formData.r_password+"&r_confirmpassword"+formData.r_confirmpassword, myFetchOptions)
    .then(response => response.json())
      .then(json => {
        this.setState({userNickName: json.NickName, userId: json.userId});
      });
    message.success("请求成功！");
    if (this.state.action == "login") {
			this.setState({hasLogined: true});
		}
    this.setModalVisible(false);
  }
  
  login(){
    this.setModalVisible(true);
  }
  
  callback(key){
    if(key == 1){
      this.setState({action: 'login'});
    }else if(key == 2){
      this.setState({action: 'register'});
    }
  }
  
  render() {
    let {getFieldProps} = this.props.form;
    const userShow = this.state.hasLogined
			? <Link to={`/usercenter`}>
					<Icon type="inbox"/>
				</Link>
			: <Icon type="setting" onClick={this.login.bind(this)}/>
    return (
      <div id="mobileheader">
        <header>
          <img className="logo" src={Logo} alt={"Logo"} />
          <span>ReactNews</span>
          {userShow}
        </header>
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
                  <FormItem label="账户"><Input placeholder="请输入您的账号" {...getFieldProps('username')} /></FormItem>
                  <FormItem type="password" label="密码"><Input placeholder="请输入您的密码" {...getFieldProps('password')} /></FormItem>
                  <Button type="primary" htmlType="submit">登录</Button>
                </Form>
              </TabPane>
              <TabPane tab="注册" key="2">
                <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                  <FormItem label="账户"><Input placeholder="请输入您的账号" {...getFieldProps('r_username')} /></FormItem>
                  <FormItem type="password" label="密码"><Input placeholder="请输入您的密码" {...getFieldProps('r_password')} /></FormItem>
                  <FormItem type="password" label="确认密码"><Input placeholder="请再次输入您的密码" {...getFieldProps('r_confirmpassword')} /></FormItem>
                  <Button type="primary" htmlType="submit">注册</Button>
                </Form>
              </TabPane>
            </Tabs>
          </Modal>
      </div>
    );
  }
}

export default MobileHeader = Form.create({})(MobileHeader);;
