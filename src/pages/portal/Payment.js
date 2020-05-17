import React from 'react'
import {Row, Col, Typography, List,Input, Space, Button} from 'antd'
const {Title} = Typography
import CheckoutForm from './components/CheckoutForm'
import {CardElement} from '@stripe/react-stripe-js';



export default class Payment extends React.Component {
  render() {
    return(

        <div style={{paddingTop: '50px'}}>
          <Title style={{fontFamily:'monospace', textAlign: 'center'}}>Payment</Title>
          <Row>
            <Col span={3}/>
            <Col span={18}>
              <CheckoutForm/>
            </Col>
            <Col span={3}/>
          </Row>
        </div>

    )
  }
}
