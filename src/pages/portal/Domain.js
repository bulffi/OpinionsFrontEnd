import React from 'react'
import {Row, Col, Typography, List,Input, Space, Button,message} from 'antd'
import { connect, loading } from 'umi';
const {Title, Text} = Typography


const mapStateToProps = (state) => {
  const domainInfo = state['DOMAIN']
  return {
    currentList : domainInfo.currentDomains,
    totalDomain: domainInfo.totalDomain,
    currentPage: domainInfo.currentPage,
    loading: state.loading.models.DOMAIN,
    newAppKey: domainInfo.newAppKey
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onInitLoadDomain: (pageSize) => {
      const action = {
        type: 'DOMAIN/getInitDomainList',
        payload: {pageSize}
      }
      dispatch(action)
    },
    onChangePage: (pageSize, lastId, pageIndex) => {
      const getDomainListAction = {
        type: 'DOMAIN/getDomainList',
        payload: {pageSize, lastId}
      }
      dispatch(getDomainListAction)
      const setNextPageAction = {
        type: 'DOMAIN/setPageIndex',
        payload: {pageIndex}
      }
      dispatch(setNextPageAction)
    },
    onAddDomain: (newDomain) => {
      const addDomainAction = {
        type: 'DOMAIN/addNewDomain',
        payload: {newDomain}
      }
      dispatch(addDomainAction)
    },
    deleteDomain: (appKey, pageSize) => {
      const deleteDomainAction = {
        type: 'DOMAIN/deleteDomain',
        payload: {appKey, pageSize}
      }
      dispatch(deleteDomainAction)
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Domain extends React.Component {
  state = {
    newDomain: '',
    pageSize: 2,
    // 每次发过来的一个数组里面的最后一个
    pagingIDList: []
  }

  onNextPage = () => {
    console.log(this.props.loading)
    let oldPagingIDList = [... this.state.pagingIDList]
    const lastId = this.props.currentList[this.props.currentList.length - 1].appKey
    oldPagingIDList.push(lastId)
    this.setState({...this.state, pagingIDList: oldPagingIDList})
    this.props.onChangePage(this.state.pageSize, lastId, this.props.currentPage + 1)
  }

  onPreviousPage = () => {
    let oldPagingIDList = [... this.state.pagingIDList]
    oldPagingIDList.pop()
    let lastId = null;
    if (oldPagingIDList.length >= 1) {
      lastId = oldPagingIDList[oldPagingIDList.length - 1]
    }
    this.setState({... this.state, pagingIDList: oldPagingIDList})
    this.props.onChangePage(this.state.pageSize, lastId, this.props.currentPage - 1)
  }

  onSubmitNewDomain = () => {
    if(this.state.newDomain.trim() === '') {
      message.warn('Please enter a new domain')
      return
    }
    console.log(this.state.newDomain)
    this.props.onAddDomain(this.state.newDomain)
  }

  componentDidMount() {
    this.props.onInitLoadDomain(this.state.pageSize)
  }

  render() {
    let newKey = (<div> </div>)
    if (this.props.newAppKey.trim()!== '') {
      newKey = (
        <div style={{paddingTop: '20px'}}>
          <Text style={{fontFamily: 'monospace', textAlign: 'center'}} >Your new app key: {this.props.newAppKey}</Text>
        </div>
      )
    }
    return(
      <div style={{paddingTop: '50px'}}>
        <Title style={{fontFamily:'monospace', textAlign: 'center'}}>Current Domains</Title>
        <Row>
          <Col span={3}/>
          <Col span={18}>
            <div style={{borderStyle:'solid', borderWidth: '1px', borderColor: '#F0F0F0'}}>
              <List
                loading={this.props.loading}
                itemLayout="horizontal"
                header={<Text style={{fontFamily: 'monospace', fontSize: '25px', color: 'black', textAlign: 'center'}}><b>Domain List</b></Text>}
                dataSource={this.props.currentList}
                renderItem={(item)=>{
                  return(
                    <List.Item
                      actions={[<Button danger={true} onClick={()=> this.props.deleteDomain(item.appKey, this.state.pageSize)}>Delete</Button>]}
                    >
                      <List.Item.Meta
                        title={item.host}
                        description={'AppKey: ' + item.appKey}
                      />
                    </List.Item>
                  )
                }}
              />
            </div>
            <Space direction={'horizontal'}>
              <Button disabled={this.props.currentPage === 1} onClick={this.onPreviousPage}>Previous</Button>
              <Text>{ this.props.currentPage + ' page'}</Text>
              <Button disabled={this.state.pageSize * this.props.currentPage >= this.props.totalDomain} onClick={this.onNextPage}>Next</Button>
            </Space>
            <div style={{paddingTop: '30px', textAlign: 'center'}}>
              <Title style={{fontFamily: 'monospace', textAlign: 'center'}}>Add A New Domain</Title>
              <Space direction={'horizontal'}>
                <Input placeholder={'Enter your new domain'} style={{width: '400px'}} value={this.state.newDomain} onChange={(e)=>this.setState({...this.state, newDomain: e.target.value})} />
                <Button onClick={this.onSubmitNewDomain} type={'primary'}>Add</Button>
              </Space>
              {newKey}
            </div>
          </Col>
          <Col span={3}/>
        </Row>
        <div style={{height: '300px'}}/>
      </div>
    )
  }
}
