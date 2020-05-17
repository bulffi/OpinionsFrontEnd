import React from 'react';
import { Layout, Menu, Button, Col, Row, BackTop, Typography } from 'antd';
import {connect} from 'dva';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
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
    const upStyle = {
      height: 40,
      width: 40,
      lineHeight: '40px',
      borderRadius: 4,
      backgroundColor: '#1088e9',
      color: '#fff',
      textAlign: 'center',
      fontSize: 14,
    };
    return (
        <Layout>
          <BackTop>
            <div style={upStyle}>TOP</div>
          </BackTop>
          <Header style={{padding: '0 120px', backgroundColor:"white",}}>
            <Row>
              <Col span={24}>
                <Menu mode={'horizontal'}>
                  <Menu.Item key="0">
                    <Link to={'/'}>
                      <div style={{fontSize: '30px', fontFamily: 'monospace', color: 'black'}}><u><b>Opinions</b></u></div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="1" style={{float: "right"}}>
                    <Button ><Link to={'/portal'}>{headerButtonName}</Link> </Button>
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
                </Menu>
              </Col>
            </Row>
          </Header>

          <Content>
            <div style={{padding: '1.5px 0', backgroundColor:"white"}}>
              {this.props.children}
            </div>
          </Content>

          <Footer style={{backgroundColor:"#353A3D"}}>
            <Row>
              <Col span={18}>
              </Col>
              <Col span={4}>
                <Title style={{fontFamily: 'Serif', color:"white"}}><u>Opinions</u></Title>
                <Text style={{padding:'0 20px', color:"white"}}>Opinions 2020 ©</Text>
              </Col>
            </Row>
          </Footer>
        </Layout>
    )
  }
}

