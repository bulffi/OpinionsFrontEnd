import React from 'react';
import { Col, Row, List, Space, Button, Skeleton } from 'antd';
import CheckoutForm from './CheckoutForm';
import CreditCardOutlined from '@ant-design/icons/lib/icons/CreditCardOutlined';
import { baseUrl } from '../../../util/ConstStore';
import Get from '../../../util/Get';
const count = 1;

export default class PaymentHistoryList extends React.Component {


  state = {
    initLoading: true,
    loading: false,
    more: true,
    data: [],
    list: [],
    lastPaymentId: '',
    date: '',
    pageSize: 1
  };

  componentDidMount() {
    this.getData(res => {
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }

  getData = callback => {
    const getPaymentURL = baseUrl + 'api/payment'
    const config = {
      params: {
        pageSize: this.state.pageSize,
        lastPaymentId: this.state.lastPaymentId,
        date: this.state.date
      }
    }
    Get(getPaymentURL, config).then((data) => {
      let more = true
      let results = []
      if (data.payments.length !== 0) {
        if (data.payments.length < this.state.pageSize) {
          more = false
        }
        for (let i = 0; i < data.payments.length; i++) {
          results = results.concat([{...data.payments[i], loading: false}])
        }
        this.setState({...this.state, lastPaymentId:results[results.length - 1].paymentId, date: results[results.length - 1].date})
      } else {
        more = false
      }
      this.setState({...this.state, more})
      callback({
        results
      })
    })
  };

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: '' }))),
    });
    this.getData(res => {
      const data = this.state.data.concat(res.results);
      this.setState(
        {
          data,
          list: data,
          loading: false,
        },
        () => {
          window.dispatchEvent(new Event('resize'));
        },
      );
    });
  };

  render() {
    const { initLoading, loading, list, more } = this.state;
    const loadMore =
      !initLoading && !loading ? more && (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={item.amount + '$  [' + item.date + ']'}
                description={'Payment ID: ' + item.paymentId}
              />
              <div><Space direction={'horizontal'}><CreditCardOutlined style={{color: 'blue'}} />{item.paymentBrand} {item.last4}</Space> </div>
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}
