import React from 'react';
import {Typography, Button, Space} from 'antd'
const { Title, Paragraph, Text } = Typography;

export default class Home extends React.Component{
  render() {
    return(
      <div>
        {/*the flowing is slogen*/}
        <div style={{textAlign: 'center', backgroundImage:'url(./img/home/backGround.png)',
          backgroundSize: '105%', backgroundRepeat: 'no-repeat', backgroundOrigin: '40% 50%'}}>
          <div style={{paddingTop: '130px', opacity: '1'}}>
            <div style={{fontFamily: 'fantasy', fontSize: '60px', color: 'black'}}> <u>Opinions</u> Matter :)</div>
            <Space direction={'vertical'}>
              <div style={{fontSize: '30px', fontFamily: 'monospace', color: 'black'}}> Bring your website a vibrant community</div>
              <div style={{height: '20px'}}/>
              <Space size={'large'} direction={'horizontal'}>
                <Button type={'primary'} size={'large'}> Get Started </Button>
                <Button size={'large'}>Learn More</Button>
              </Space>
            </Space>
          </div>
          <div style={{width: '100%', height: '400px'}}>
          </div>
        </div>
      </div>
    )
  }
}
