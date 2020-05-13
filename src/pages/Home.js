import React from 'react';
import {Typography} from 'antd'
const { Title, Paragraph, Text } = Typography;

export default class Home extends React.Component{
  render() {
    return(
      <div>
        {/*the flowing is slogen*/}
        <div style={{textAlign: 'center'}}>
          <Title style={{fontFamily: 'fantasy', fontSize: '50px'}}> Your <u>Opinions</u>  <br/> Matter :)</Title>
        </div>
      </div>
    )
  }
}
