import React from 'react';
import {Typography, Button, Space, Row, Col, BackTop, Slider } from 'antd'
import {Link} from 'umi'
const { Title, Paragraph, Text } = Typography;

export default class Pricing extends React.Component {
  state = {
    commentView: 0,
    commentRequest: 0,
    commentSum: 0,
    viewPrice: (5 + 6 + 1) * Math.pow(10, -6),
    requestPrice: (5 + 6 + 1) * Math.pow(10, -5),
    // sumPrice: (3) * Math.pow(10, -5)
  }

  onChangePageView = (value) => {
    this.setState({
      ...this.state,
      commentView: value
    })
  }

  onChangeCommentRequest = (value) => {
    this.setState({
      ...this.state,
      commentRequest: value
    })
  }

  // onChangeCommentSum = (value) => {
  //   this.setState({
  //     ...this.state,
  //     commentSum: value
  //   })
  // }

  render() {
    const viewCost = this.state.commentView * this.state.viewPrice
    const requestCost = this.state.commentRequest * this.state.requestPrice
    // const sumCost = this.state.commentSum * this.state.sumPrice
    const cost = ( viewCost + requestCost ).toFixed(2)
    return(
      <div>
        <div style={{ backgroundImage:'url(./img/pricing/pricingBack.png)',
          backgroundSize: '22%', backgroundRepeat: 'no-repeat'}}>
          <div style={{textAlign: 'center',}}>
            <div style={{paddingTop: '100px', opacity: '1'}}>
              <Title style={{fontFamily: 'monospace', fontSize: '60px', color: 'black'}}>Pay for what you use</Title>
              <Space direction={'vertical'}>
                <div style={{fontSize: '30px', fontFamily: 'monospace', color: 'black'}}>
                  No subscription or plan
                </div>
                <div style={{height: '20px'}}/>
              </Space>
            </div>
            <div style={{width: '100%', height: '100px'}}>
            </div>
          </div>
        </div>
        <div>
          <Row>
            <Col span={6}/>
            <Col span={12}>
              <div>
                <Text style={{fontFamily: 'monospace', color: 'black', fontSize: '20px'}}> Comment View {this.state.commentView} ({this.state.viewPrice.toFixed(6)}$ per comment view)</Text>
                <Slider
                  min={0}
                  max={9999999 + 1}
                  step={1000}
                  onChange={this.onChangePageView}
                />
              </div>
              <div>
                <Text style={{fontFamily: 'monospace', color: 'black', fontSize: '20px'}}> Comment Request {this.state.commentRequest} ({this.state.requestPrice.toFixed(6)}$ per request)</Text>
                <Slider
                  min={0}
                  max={99999 + 1}
                  onChange={this.onChangeCommentRequest}
                />
              </div>
              {/*<div>*/}
              {/*  <Text style={{fontFamily: 'monospace', color: 'black', fontSize: '20px'}}> Comment Number {this.state.commentSum} ({this.state.sumPrice.toFixed(6)}$ per comment per month)*/}
              {/*  </Text>*/}
              {/*  <Slider*/}
              {/*    min={0}*/}
              {/*    max={999999 + 1}*/}
              {/*    onChange={this.onChangeCommentSum}*/}
              {/*  />*/}
              {/*</div>*/}
            </Col>
            <Col span={6}/>
          </Row>
          <div style={{textAlign: 'center', paddingTop: '30px'}}>
            <Title style={{fontFamily: 'monospace'}}>Total cost <br/> <u>{cost}$ per month</u> </Title>
          </div>
        </div>
      </div>
    )
  }
}
