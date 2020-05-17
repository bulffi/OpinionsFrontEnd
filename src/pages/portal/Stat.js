import React from 'react'
import {Row, Col, Typography, Card, Space} from 'antd'
const {Title} = Typography
import ReactEcharts from 'echarts-for-react';
export default class Stat extends React.Component {
  state = {
    balance: 134.325464,
    writeRequest: 21454,
    readRequest: 2432546,
    siteList: ['site1', 'site2', 'site3'],
    timeLine: ['2020-5-10','2020-5-17','2020-5-27']
  }

  getOption = () => {

    return {
      title: {
        text: 'Comment Number'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: this.state.siteList
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.state.timeLine
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'site1',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [120, 132, 101,]
        },
        {
          name: 'site2',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [220, 182, 191,]
        },
        {
          name: 'site3',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [150, 232, 201,]
        },
      ]
    }
  }

  render() {
    return(
      <div style={{paddingTop: '50px', paddingBottom: '100px'}}>
        <Title level={1} style={{fontFamily: 'monospace', textAlign: 'center'}}>Recent Stats</Title>
        <Row>
          <Col span={2}/>
          <Col span={20}>
            <Title level={2} style={{textAlign: 'center', fontFamily: 'monospace'}}>Total Comment Number</Title>
            <ReactEcharts option={this.getOption()} />
          </Col>
          <Col span={2}/>
        </Row>
        <div style={{height: '50px'}}/>
        <Row>
          <Col span={2}/>
          <Col span={6}>
            <Card title="Balance" extra={<a href="#">More</a>}>
              <Space direction={'horizontal'}>
                <div style={{fontFamily:'monospace', fontSize: '80px'}}>$</div>
                <div style={{fontFamily: 'monospace', fontSize: '25px', paddingTop: '40px'}}>{this.state.balance}</div>
              </Space>
            </Card>
          </Col>
          <Col span={1}/>
          <Col span={6}>
            <Card title="Total View" extra={<a href="#">More</a>} style={{ width: 300 }}>
              <Space direction={'vertical'}>
                <Space direction={'horizontal'}>
                  <div style={{fontFamily: 'monospace', fontSize: '80px'}}>R: </div>
                  <div style={{fontFamily: 'monospace', paddingTop: '30px', fontSize: '25px'}}>{this.state.readRequest}</div>
                </Space>

              </Space>
            </Card>
          </Col>
          <Col span={1}/>
          <Col span={6}>
            <Card title="Total Add" extra={<a href="#">More</a>} style={{ width: 300 }}>
              <Space direction={'horizontal'}>
                <div style={{fontFamily: 'monospace', fontSize: '80px'}}>W: </div>
                <div style={{fontFamily: 'monospace',paddingTop: '30px', fontSize: '25px'}}>{this.state.writeRequest}</div>
              </Space>
            </Card>
          </Col>
          <Col span={2}/>
        </Row>
      </div>
    )
  }
}
