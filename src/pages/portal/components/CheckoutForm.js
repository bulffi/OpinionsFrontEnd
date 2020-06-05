import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { CardElement, Elements, ElementsConsumer, useElements, useStripe } from '@stripe/react-stripe-js';
import './common.css'
import { Button, InputNumber, message ,Space, Typography, Divider } from 'antd';
import PaymentHistoryList from './PaymentHistoryList';
import axios from 'axios'
import { baseUrl } from '../../../util/ConstStore';
import Get from '../../../util/Get';
import { connect } from 'dva';


const mapStateToProps = (state) => {
  const userInfo = state['USER']
  return {
    userName: userInfo.userName,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}
@connect(mapStateToProps, mapDispatchToProps)
class StripForm extends React.Component {
  state = {
    loading : false,
    amount: 16 * 100
  }
  handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    this.setState({...this.state, loading: true})
    const {stripe, elements} = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      message.error(error.message)
      this.setState({...this.state, loading: false})
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      const getClientKeyURL = baseUrl + 'api/secret'
      const config = {
        params: {
          value: this.state.amount
        }
      }
      const data = await Get(getClientKeyURL, config)
      if (data.code === 200) {
        message.info('Begin transaction')
      }
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: this.props.userName,
          },
        }
      });

      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        message.error(result.error.message)
        console.log(result.error.message);
        this.setState({ ...this.state, loading: false })
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          message.success('Thank you for your payment!')
          console.log('success!')
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
        this.setState({ ...this.state, loading: false })
      }
    }
  };

  onMoneyChange = (value) => {
    if (value !== Math.floor(value)) {
      message.warn('You can only pay in one dollar')
      return
    }
    this.setState({...this.state, amount: Math.floor(value) * 100})
  }

  render() {
    const {stripe} = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Space direction='horizontal' size={'large'}>
            <Typography.Text>Amount: </Typography.Text>
            <InputNumber
              style={{width: '200px', borderStyle: 'unset', height: '40px'}}
              defaultValue={16}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              step={1}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={this.onMoneyChange}
            />
          </Space>
          <div style={{height: '30px'}}/>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          <Button loading={this.state.loading} type="primary" onClick={this.handleSubmit} disabled={!stripe}>
            Pay
          </Button>
        </form>
        <Divider>Payment history</Divider>
        <PaymentHistoryList/>
        <div style={{height: '50px'}}/>
      </div>

    );
  }
}

const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({elements, stripe}) => (
        <StripForm elements={elements} stripe={stripe} />
      )}
    </ElementsConsumer>
  );
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_rgGAuPQ6Cd8VlQP5GvME7Tj100lTd7COJZ');

const CheckoutForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <InjectedCheckoutForm />
    </Elements>
  );
};

export default CheckoutForm;
