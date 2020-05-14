import React from 'react';
import { Button, Space, Row, Col, Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;
import {Link} from 'umi'

export default class Features extends React.Component{
  render() {
    return(
      <div style={{ backgroundImage:'url(./img/features/featuresBack.png)',
        backgroundSize: '105%', backgroundRepeat: 'no-repeat', backgroundOrigin: '40% 50%'}}>
        <div style={{textAlign: 'center',}}>
          <div style={{paddingTop: '100px', opacity: '1'}}>
            <Title style={{fontFamily: 'monospace', fontSize: '60px', color: 'black'}}>What we bring you?</Title>
            <Space direction={'vertical'}>
              <div style={{fontSize: '30px', fontFamily: 'monospace', color: 'black'}}>
                <u>Convenience</u>, <u>Security</u>, <u>Scalability</u> at <u>Lowest Cost</u>
              </div>
              <div style={{height: '20px'}}/>
            </Space>
          </div>
          <div style={{width: '100%', height: '100px'}}>
          </div>
        </div>
        <div style={{fontFamily: 'monospace'}}>
          <Row>
            <Col span={4}/>
            <Col span={7}>
              <Typography>
                <Title style={{textAlign: 'center'}} level={2}>Ease of use</Title>
                <Paragraph style={{fontSize: '16px', color: 'black'}}>
                  Using our service, you can easily add comment function to a static website without
                  managing any form of infrastructure (servers, database, and more). Just 2 lines of code
                  and log in to our portal, you will get what you want out of the box.
                </Paragraph>
              </Typography>
            </Col>
            <Col span={2}/>
            <Col span={7}>
              <Typography>
                <Title style={{textAlign: 'center'}} level={2}>Total control</Title>
                <Paragraph style={{fontSize: '16px', color: 'black'}}>
                  Every comment on your website has to be accepted by yourself before anyone
                  else is able to see it. With our advanced AI model and anti-spam mechanism, we will filter
                  out most of the garbage before you even know.
                </Paragraph>
              </Typography>
            </Col>
            <Col span={4}/>
          </Row>
          <div style={{height: '30px'}}/>
          <Row>
            <Col span={4}/>
            <Col span={7}>
              <Typography>
                <Title style={{textAlign: 'center'}} level={2}>From one to infinite</Title>
                <Paragraph style={{fontSize: '16px', color: 'black'}}>
                  No matter how busy your websites are, we can scale to meet your need. With intensive use of
                  cloud services, we offer you the state of art technology. Your data will be distributed
                  around the world to serve your visitors without latency.
                </Paragraph>
              </Typography>
            </Col>
            <Col span={2}/>
            <Col span={7}>
              <Typography>
                <Title style={{textAlign: 'center'}} level={2}>Pay as you go</Title>
                <Paragraph style={{fontSize: '16px', color: 'black'}}>
                  Our service is extremely competitive in price. Instead of buying a subscription with a
                  fixed price, we introduce you the pay as you go model (learn more <Link to={'/pricing'}>here</Link> ), you only pay for page visit count and
                  comment number and nothing more.
                </Paragraph>
              </Typography>
            </Col>
            <Col span={4}/>
          </Row>
        </div>
      </div>
    )
  }

}
