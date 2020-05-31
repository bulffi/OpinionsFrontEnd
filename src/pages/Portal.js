import React from 'react'
import {connect} from 'dva'
import { Row, Col, Form, Input, Button, Typography, Layout, Menu, message, Tabs, Steps } from 'antd';
const { Title } = Typography
const { Sider, Content } = Layout;
import {Link} from 'umi'

const mapStateToProps = (state) => {
  const userInfo = state['USER']
  return {
    loggedIn: userInfo.logIn,
    userName: userInfo.usage,
    signUpStep: userInfo.signUpStep,
    resetStep: userInfo.resetStep,
    loading: state.loading.models.USER
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (userName, userPassword) => {
      const action = {
        type: 'USER/signIn',
        payload: {userName, userPassword}
      }
      dispatch(action)
    },
    onSignUp: (userName, userPassWord, userEmail) => {
      const action = {
        type: 'USER/signUp',
        payload: {userName, userPassWord, userEmail}
      }
      dispatch(action)
    },
    onResetPassword: (userName) => {
      const action = {
        type: 'USER/resetPassword',
        payload: {userName}
      }
      dispatch(action)
    },
    onResetConfirm: (code, userPassWord, userName) => {
      const action = {
        type: 'USER/resetConfirm',
        payload: {code, userPassWord, userName}
      }
      dispatch(action)
    }
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Portal extends React.Component {

  state = {
      resetUserName: ''
  }

  onFinish = values => {
    console.log('Success:', values);
    this.props.onSignIn(values.username,values.password)
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  onSignUpFinish = (values) => {
    this.props.onSignUp(values.username, values.password, values.email)
  }

  onSignUpFailed = (errorInfo) => {}

  onResetFinish = (values) => {
    this.setState({...this.state, resetUserName: values.username})
    this.props.onResetPassword(values.username)
  }

  onResetFail = (values) => {}

  onConfirmFinish = (values) => {
    this.props.onResetConfirm(values.code, values.password, this.state.resetUserName)
  }

  onConfirmFail = (values) => {}

  render() {
    let componentsToDraw = null
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
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
                      <b>Audit Comments</b>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key={'5'}>
                    <Link to={'/portal/view'}>
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
      const stepsForSignUp = [(
        <div style={{paddingTop: '20px'}}>
          <Row>
            <Col span={4}/>
            <Col span={14}>
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={this.onSignUpFinish}
                onFinishFailed={this.onSignUpFailed}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your password!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Email Address"
                  name={"email"}
                  rules={[
                    {
                      required: true,
                      type: 'email',
                      message: 'Please enter your email address'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button loading={this.props.loading} type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col span={6}/>
          </Row>
        </div>
      ), (
        <div style={{paddingTop: '40px', textAlign: 'center'}}>
          <Title style={{fontFamily: 'monospace'}}>
            Please check your email :)
          </Title>
        </div>
      )]
      const stepsForReset = [
        (
          <div style={{paddingTop: '50px'}}>
            <Row>
              <Col span={4}/>
              <Col span={14}>
                <Form
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={this.onResetFinish}
                  onFinishFailed={this.onResetFail}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your username!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button loading={this.props.loading} type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col span={6}/>
            </Row>
          </div>
        ),
        (
          <div style={{paddingTop: '50px'}}>
            <Row>
              <Col span={4}/>
              <Col span={14}>
                <Form
                  name="basic"
                  onFinish={this.onConfirmFinish}
                  onFinishFailed={this.onConfirmFail}
                >
                  <Form.Item
                    label="Confirm code"
                    name="code"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your confirm code!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your new password!',
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button loading={this.props.loading} type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col span={6}/>
            </Row>
          </div>
        ),
        (
          <div style={{paddingTop: '50px'}}>
            <Title style={{fontFamily: 'monospace', textAlign: 'center'}}>
              Do not forget next time :)
            </Title>
          </div>
        )
      ]
      componentsToDraw = (
        <div style={{paddingTop: '50px'}}>
          <Row>
            <Col span={6}/>
            <Col span={12}>
              <Typography>
                <Title style={{fontFamily: 'monospace', textAlign: 'center'}}>Welcome</Title>
              </Typography>
              <Tabs style={{height: '500px'}} defaultActiveKey="1">
                <Tabs.TabPane tab="Sign In" key="1">
                  <div style={{paddingTop: '30px'}}>
                    <Row>
                      <Col span={4}/>
                      <Col span={16}>
                        <Form
                          {...layout}
                          name="basic"
                          onFinish={this.onFinish}
                          onFinishFailed={this.onFinishFailed}
                        >
                          <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please enter your username!' }]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                          >
                            <Input.Password />
                          </Form.Item>
                          <Form.Item  {...tailLayout}>
                            <Button loading={this.props.loading} type="primary" htmlType="submit">
                              Sign In
                            </Button>
                          </Form.Item>
                        </Form>
                      </Col>
                      <Col span={4}/>
                    </Row>

                  </div>

                </Tabs.TabPane>
                <Tabs.TabPane tab="Sign Up" key="2">
                  <div style={{paddingTop: '20px'}}>
                    <Steps current={this.props.signUpStep}>
                      <Steps.Step title="Enter your information" description="We will send you an email" />
                      <Steps.Step title="Verify your email" description="Click the verify link in your email" />
                    </Steps>
                    {stepsForSignUp[this.props.signUpStep]}
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab={"Forgot Password"} key={"3"}>
                  <div style={{paddingTop: '20px'}}>
                    <Steps current={this.props.resetStep}>
                      <Steps.Step title="Enter your username" description="We will send you an email" />
                      <Steps.Step title="Verify and reset" description="Enter your confirm code and new password" />
                      <Steps.Step title={"Finish"} />
                    </Steps>
                    {stepsForReset[this.props.resetStep]}
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </Col>
            <Col span={6}/>
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
