import React from 'react';
import { Layout, Menu, Button, Col, Row } from 'antd';
import {connect} from 'dva';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import { Typography } from 'antd';
import {Link} from 'umi'
const { Title,Text } = Typography;
const mapStateToProps = (state) => {
  const userInfo = state['USER']
  return {
    loggedIn: userInfo.logIn,
    userName: userInfo.usage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickButton: () => {
      const action = {
        type: 'test/increment',
        payload: 1
      };
      dispatch(action)
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends React.Component{

  state = {
    portalOpen: true,
    portalCollapsed: false,
  }

  onCollapse = collapsed => {
    this.setState({ ...this.state, portalCollapsed: collapsed });
  };

  render() {
    const {loggedIn, userName} = this.props
    let headerButtonName = ''
    if (loggedIn) {
      headerButtonName = 'Open Portal'
    } else {
      headerButtonName = 'Sign In'
    }
    return (
        <Layout>

          <Header style={{padding: '0 120px', backgroundColor:"white"}}>
            <Row>
              <Col span={3}>
                <Link to={'/'}>
                  <Title style={{padding: '8px 0', fontFamily: 'Serif'}}>Opinions</Title>
                </Link>
              </Col>
              <Col span={21}>
                <Menu mode={'horizontal'}>
                  <Menu.Item key="1" style={{float: "right"}}>
                    <Button type={'primary'} >{headerButtonName}</Button>
                  </Menu.Item>
                  <Menu.Item key="2" style={{float: "right"}}>
                    <Text strong={true}>Get Started</Text>
                  </Menu.Item>
                  <Menu.Item key={"3"}>
                    <Link to={'/features'}>
                      <Text strong={true}>Features</Text>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key={"4"}>
                    <Link to={'/pricing'}>
                      <Text strong={true}>Pricing</Text>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key={"5"}>
                    <Link to={'/about'}>
                      <Text strong={true}>About</Text>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
          </Header>

          <Content>
            <div style={{padding: '60px 120px', backgroundColor:"white"}}>
              {this.props.children}
            </div>
          </Content>

          <Footer style={{backgroundColor:"#353A3D"}}>
            <Row>
              <Col span={20}>
              </Col>
              <Col span={4}>
                <Title style={{fontFamily: 'Serif', color:"white"}}>Opinions</Title>
                <Text style={{padding:'0 20px', color:"white"}}>Opinions 2020 ©</Text>
              </Col>
            </Row>
          </Footer>
        </Layout>
    )
  }
}

