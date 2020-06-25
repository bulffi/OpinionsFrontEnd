import React from 'react';
import { Row, Col, Typography, Card, Space, message } from 'antd';
import axios from 'axios';
import { baseUrl } from '../../util/ConstStore';
import Get from '../../util/Get';
import { connect } from 'umi';
const { Title } = Typography;

const mapStateToProps = state => {
  const { userId } = state['USER'];
  return {
    userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Stat extends React.Component {
  state = {
    balance: 0,
    writeRequest: 0,
    readRequest: 0,
    loading: true,
  };

  componentDidMount() {
    const getStatURL = baseUrl + 'api/stat';
    const data = Get(getStatURL).then(data => {
      if (data.code === 200) {
        message.success('Get stat success');
        const { balance, readCount, writeCount } = data.userStat;
        console.log(readCount, writeCount);
        this.setState({
          ...this.state,
          balance: balance,
          writeRequest: writeCount,
          readRequest: readCount,
          loading: false,
        });
      } else {
        message.error('Get stat fail');
        this.setState({
          ...this.state,
          loading: false,
        });
      }
    });
  }

  render() {
    return (
      <div style={{ paddingTop: '50px', paddingBottom: '100px' }}>
        <Title
          level={1}
          style={{ fontFamily: 'monospace', textAlign: 'center' }}
        >
          Recent Stats
        </Title>
        <Row>
          <Col span={2} />
          <Col span={6}>
            <Card loading={this.state.loading} title="Balance">
              <Space direction={'horizontal'}>
                <div style={{ fontFamily: 'monospace', fontSize: '80px' }}>
                  $
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '25px',
                    paddingTop: '40px',
                  }}
                >
                  {this.state.balance}
                </div>
              </Space>
            </Card>
          </Col>
          <Col span={1} />
          <Col span={6}>
            <Card
              loading={this.state.loading}
              title="Total View"
              style={{ width: 300 }}
            >
              <Space direction={'vertical'}>
                <Space direction={'horizontal'}>
                  <div style={{ fontFamily: 'monospace', fontSize: '80px' }}>
                    R:{' '}
                  </div>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      paddingTop: '30px',
                      fontSize: '25px',
                    }}
                  >
                    {this.state.readRequest}
                  </div>
                </Space>
              </Space>
            </Card>
          </Col>
          <Col span={1} />
          <Col span={6}>
            <Card
              loading={this.state.loading}
              title="Total Write"
              style={{ width: 300 }}
            >
              <Space direction={'horizontal'}>
                <div style={{ fontFamily: 'monospace', fontSize: '80px' }}>
                  W:{' '}
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    paddingTop: '30px',
                    fontSize: '25px',
                  }}
                >
                  {this.state.writeRequest}
                </div>
              </Space>
            </Card>
          </Col>
          <Col span={2} />
        </Row>
        <div style={{ height: '50px' }} />
        <Row>
          <Col span={4} />
          <Col span={16}>
            <Title
              level={1}
              style={{ fontFamily: 'monospace', textAlign: 'center' }}
            >
              <a href={'http://www.baidu.com?userid=' + this.props.userId}>
                [Click here] to find our your reviewer's location!
              </a>
            </Title>
          </Col>
          <Col span={4} />
        </Row>
      </div>
    );
  }
}
