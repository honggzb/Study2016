import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Card, Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal, notification} from 'antd';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileUserCenter extends Component {
  
  render() {
    return (
      <div>
        <Row>
					<Col span={24}>
						<Tabs>
							<TabPane tab="我的收藏列表" key="1">
                <div class="comment">
  									<Row>
  										<Col span={24}>
  											usercollectionList
  										</Col>
  									</Row>
  								</div>
              </TabPane>
							<TabPane tab="我的评论列表" key="2">
                <div class="comment">
                  <Row>
                    <Col span={24}>
                      usercollectionList
                    </Col>
                  </Row>
                </div>
              </TabPane>
							<TabPane tab="头像设置" key="3"></TabPane>
						</Tabs>
					</Col>
				</Row>
      </div>
    );
  }
}

export default MobileUserCenter;
