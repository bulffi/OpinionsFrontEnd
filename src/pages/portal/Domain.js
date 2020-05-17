import React from 'react'
import {Row, Col, Typography, List,Input, Space, Button} from 'antd'
const {Title} = Typography
export default class Domain extends React.Component {
  state = {
    currentDomains: [
      {
        domain:'http://localhost:5050',
        AppKey: 'SDJfg48toehgf83tysf',
      },
      {
        domain: 'https://www.inkling.xyz',
        AppKey: 'SAdf48tLSKFDJHhf',
      }
    ],
    newDomain: '',
    newAppKey: ''
  }
  render() {
    return(
      <div style={{paddingTop: '50px'}}>
        <Title style={{fontFamily:'monospace', textAlign: 'center'}}>Current Domains</Title>
        <Row>
          <Col span={3}/>
          <Col span={18}>
            <div style={{borderStyle:'solid', borderWidth: '1px', borderColor: '#F0F0F0'}}>
              <List
                itemLayout="horizontal"
                dataSource={this.state.currentDomains}
                renderItem={(item)=>{
                  return(
                    <List.Item>
                      <List.Item.Meta
                        title={item.domain}
                        description={'AppKey: ' + item.AppKey}
                      />
                    </List.Item>
                  )
                }}
              />
            </div>
            <div style={{paddingTop: '30px', textAlign: 'center'}}>
              <Title style={{fontFamily: 'monospace', textAlign: 'center'}}>Add A New Domain</Title>
              <Space direction={'horizontal'}>
                <Input placeholder={'Enter your new domain'} style={{width: '400px'}} value={this.state.newDomain} onChange={(value)=>this.setState({...this.state, newDomain: value})} />
                <Button type={'primary'}>Add</Button>
              </Space>
            </div>
          </Col>
          <Col span={3}/>
        </Row>
        <div style={{height: '300px'}}/>
      </div>
    )
  }
}
