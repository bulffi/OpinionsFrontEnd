import React from 'react'
import {Row, Col, Typography, Card} from 'antd'
import {CheckCircleTwoTone} from '@ant-design/icons'
import CloseCircleOutlined from '@ant-design/icons/lib/icons/CloseCircleOutlined';
const {Title} = Typography

export default class Manage extends React.Component {
  state = {
    commentToJudge: [
      {
        commentId: 'WAIT#F#sfd',
        content: 'This is a good comment',
        authorName: 'zzj',
        email: 'zzj1999@outlook.com'
      },
      {
        commentId: 'WAIT#F#sdfgd',
        content: 'This is a bad comment',
        authorName: 'luohao',
        email: 'luohao@outlook.com'
      }
    ]

  }

  render() {

    return(
      <div style={{paddingTop: '50px'}}>
        <Title style={{fontFamily:'monospace', fontSize: '30px', textAlign: 'center'}}>Comments To Admit</Title>
        <Row>
          <Col span={3}/>
          <Col span={18}>
            {this.state.commentToJudge.map(((value, index) => {
                return(
                  <div key={index} style={{paddingBottom: '20px'}}>
                    <Card title={value.authorName + ' ' + value.email} actions={
                      [
                        <CheckCircleTwoTone twoToneColor="#52c41a" key={'ok'} />,
                        <CloseCircleOutlined style={{color:'#EB2F96'}} key={'no'} />
                      ]
                    }>
                      {value.content}
                    </Card>
                  </div>
                )
            }))}
          </Col>
          <Col span={3}/>
        </Row>
        <div style={{height: '200px'}}/>
      </div>
    )
  }
}
