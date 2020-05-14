import React from 'react';
import {Typography, Button, Space, Row, Col, BackTop } from 'antd'
import {Link} from 'umi'
import {CodeBlock, atomOneLight} from 'react-code-blocks'
const { Title, Paragraph, Text } = Typography;

export default class Home extends React.Component{
  render() {
    const code =
      `import Opinions from 'opinions-react-component'
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        <p>Hello World</p>
        <Opinions AppID={'Your UUID'}/>
      </div>
    );
  }
}`

    return(
      <div>

        {/*the flowing is slogan*/}
        <div style={{textAlign: 'center', backgroundImage:'url(./img/home/comment.png)',
          backgroundSize: '22%', backgroundRepeat: 'no-repeat', backgroundOrigin: '40% 50%'}}>
          <div style={{paddingTop: '130px', opacity: '1'}}>
            <Title style={{fontFamily: 'monospace', fontSize: '60px', color: 'black'}}> <u>Opinions</u> Matter :)</Title>
            <Space direction={'vertical'}>
              <div style={{fontSize: '30px', fontFamily: 'monospace', color: 'black'}}> Bring your website a vibrant community</div>
              <div style={{height: '20px'}}/>
              <Space size={'large'} direction={'horizontal'}>
                <Button type={'primary'} size={'large'}> Get Started </Button>
                <Button size={'large'}><Link to={'/features'}>Learn More</Link></Button>
              </Space>
            </Space>
          </div>
          <div style={{width: '100%', height: '180px'}}>
          </div>
        </div>
        <Row>
          <Col span={4}/>
          <Col span={7}>
            <div style={{borderStyle:'dotted', borderWidth: '1px'}}>
              <CodeBlock
                text={code}
                language={'jsx'}
                wrapLines
                highlight={'1,7'}
                theme={atomOneLight}
              />
            </div>
          </Col>
          <Col span={3}/>
          <Col span={7}>
            <Typography style={{fontFamily:'monospace', paddingTop: '30px'}}>
              <Title style={{textAlign: 'center'}}>2 lines of code</Title>
              <Paragraph style={{fontSize: '16px', color: 'black'}}>
                With just 2 lines of code, your website is able to get a brilliant comment function
                which gives your visitors an opportunity to express their thoughts while we will be
                doing all the heavy lifting.
              </Paragraph>
            </Typography>
          </Col>
          <Col span={3}/>
        </Row>
        <div style={{height: '90px'}}/>
        <Row>
          <Col span={3}/>
          <Col span={8}>
            <Typography style={{fontFamily:'monospace', paddingTop: '30px'}}>
              <Title style={{textAlign: 'center'}}>.. and a portal.</Title>
              <Paragraph style={{fontSize: '16px', color: 'black', paddingLeft: '30px'}}>
                Opportunity is given, but you have the final word. Using our portal to manage your
                comments, analyse your visitors and thus retain and embrace a community.
              </Paragraph>
            </Typography>
          </Col>
          <Col span={3}/>
          <Col span={7}>
            <img style={{width: '110%', height:'auto'}} src={'./img/home/portalLogo.png'} alt={'User Portal'}/>
          </Col>
          <Col span={3}/>
        </Row>
      </div>
    )
  }
}
