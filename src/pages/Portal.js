import React from 'react'
import {connect} from 'dva'
import { Row, Col, Form, Input, Button, Typography,Layout, Menu, } from 'antd';
const { Title } = Typography
const { Sider, Content } = Layout;
import {Link} from 'umi'



const mapStateToProps = (state) => {
  const userInfo = state['USER']
  return {
    loggedIn: userInfo.logIn,
    userName: userInfo.usage
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (userName, userPassword) => {
      console.log(userName + 'login')
    }
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Portal extends React.Component {

  onFinish = values => {
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    let componentsToDraw = null
    if (this.props.loggedIn) {
      componentsToDraw = (
        <div>
            <Layout style={{backgroundColor: 'white'}}>
              <Sider style={{borderStyle:'solid', borderWidth: '1px', borderColor: '#F0F0F0'}}>
                <Menu
                  mode="inline"
                  style={{ height: '100%', borderRight: 0 }}
                >
                  <Menu.Item key={'1'}>
                    <Link to={'/portal/stat'}>
                      <b>Statistics</b>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key={'2'}>
                    <Link to={'/portal/manage'}>
                      <b>Manage Comments</b>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key={'3'}>
                    <Link to={'/portal/domain'}>
                      <b>Manage Domain</b>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key={'4'}>
                    <Link to={'/portal/payment'}>
                      <b>Payment</b>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Content>
                <div style={{padding: '1.5px 0', backgroundColor:"white"}}>
                    {this.props.children}
                </div>
              </Content>
            </Layout>
        </div>
      )
    } else {
      componentsToDraw = (
        <div>
          <Row>
            <Col span={9}/>
            <Col span={6}>
              <Typography>
                <Title style={{fontFamily: 'monospace', textAlign: 'center'}}>Welcome</Title>
              </Typography>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item style={{textAlign: 'center'}}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col span={9}/>
          </Row>
        </div>
      )
    }
    return(
      <div>
        {componentsToDraw}
      </div>
    )
  }
}
