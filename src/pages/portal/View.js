import React from 'react'
import {Row, Col, Typography, List,Input, Card, Button, Form, Drawer, message, Modal} from 'antd'
const {Title, Text, Paragraph} = Typography
import CheckoutForm from './components/CheckoutForm'
import {CardElement} from '@stripe/react-stripe-js';
import axios from 'axios'
import { connect } from 'umi';
import BraftEditor from 'braft-editor';
import { baseUrl } from '../../util/ConstStore';
const OpenCommentAPI = 'https://tx2kiq48a2.execute-api.ap-southeast-1.amazonaws.com/Prod/open/comment'
// const OpenCommentAPI = 'http://127.0.0.1:3000/open/comment'
const { confirm } = Modal;
import { ExclamationCircleOutlined } from '@ant-design/icons';


const mapStateToProps = (state) => {
  const { showList } = state['VIEW']
  return {
    showList,
    loading: state.loading.models.VIEW,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeFatherContent: (content) => {
      const action = {
        type: 'AUDIT/setFatherContent',
        payload: {
          content
        }
      }
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class View extends React.Component {

  state = {
    comments: [],
    subComments: [],
    visible: false,
    currentFatherID: null,
    mainListLoading: false,
    subListLoading: true,
    noMoreMainComment: true,
    noMoreSubComment: true,
    mainCommentLastId: '',
    subCommentLastId: '',
    mainMoreLoading: false,
    subMoreLoading: false,
    appKey:'',
    url: '',
    showList: false,
    pageSize: 10,
    deleteLoading: false
  }

  componentDidMount() {
  }

  onFinish = values => {
    console.log('Success:', values);
    this.setState({...this.state, appKey: values.appKey, url: values.url, showList:true })
    this.onGetMainComment()
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  onLoadMore = async() => {
    await this.setState({...this.state, mainMoreLoading: true})
    axios.get(OpenCommentAPI,
      {
        params: {
          url: this.state.url,
          appKey: this.state.appKey,
          pageSize: this.state.pageSize,
          lastID: this.state.mainCommentLastId
        }
      }).then((response) => {
      message.success('Loading success')
      const newList = response.data.message
      if (newList.length === 0) {
        this.setState({...this.state,
          noMoreMainComment: true,
          mainMoreLoading: false
        })
        return
      }
      let oldList = [...this.state.comments]
      oldList = oldList.concat(newList)
      this.setState({...this.state,
        comments: oldList,
        noMoreMainComment: newList.length < this.props.pageSize,
        mainCommentLastId: newList[newList.length - 1].CommentId,
        mainMoreLoading: false
      })
    }).catch((err) => {
      message.error('Loading fail')
      this.setState({
        ...this.state,
        mainMoreLoading: false
      })
    })
  }

  onLoadMoreSub = (fatherID) => {
    this.setState({...this.state, subMoreLoading: true})
    axios.get(OpenCommentAPI,
      {
        params: {
          url: this.state.url,
          appKey: this.state.appKey,
          pageSize: this.state.pageSize,
          lastID: this.state.subCommentLastId,
          fatherID: this.state.currentFatherID
        }
      }).then((response) => {
      message.success('Loading success')
      const newList = response.data.message
      if (newList.length === 0) {
        this.setState({...this.state,
          noMoreSubComment: true,
          subMoreLoading: false
        })
        return
      }
      let oldList = [...this.state.subComments]
      oldList = oldList.concat(newList)
      this.setState({...this.state,
        subComments: oldList,
        noMoreSubComment: newList.length < this.props.pageSize,
        subCommentLastId: newList[newList.length - 1].CommentId,
        subMoreLoading: false
      })
    }).catch((err) => {
      message.error('Loading fail')
      this.setState({
        ...this.state,
        subMoreLoading: false
      })
    })

  }

  onGetMainComment = () => {
    this.setState({...this.state, mainListLoading: true})
    axios.get( OpenCommentAPI,
      {
        params: {
          url: this.state.url,
          appKey: this.state.appKey,
          pageSize: this.state.pageSize
        }
      }
    ).then(
      (response) => {
        message.success('Loading success')
        const data = response.data
        if (data.message.length === 0) {
          this.setState({
            ...this.state,
            comments: data.message,
            mainListLoading: false,
            noMoreMainComment: false
          })
          return
        }
        this.setState({
          ...this.state,
          comments: data.message,
          mainListLoading: false,
          mainCommentLastId: data.message[data.message.length - 1].CommentId,
          noMoreMainComment: data.message.length < this.props.pageSize
        })
      }
    ).catch(
      (errorMessage) => {
        message.error('Loading comment fail')
        this.setState({... this.state, mainListLoading: false})
        console.log(errorMessage)
      }
    )
  }

  getSubComment = (fatherID) => {
    axios.get(OpenCommentAPI,
      {
        params: {
          url: this.state.url,
          appKey: this.state.appKey,
          pageSize: this.state.pageSize,
          fatherID,
        }
      }
    ).then(
      (response) => {
        message.success('Loading success')
        const data = response.data
        if (data.message.length === 0) {
          this.setState({
            ...this.state,
            currentFatherID: fatherID,
            subComments: data.message,
            subListLoading: false,
            noMoreSubComment: true
          })
          return
        }
        this.setState({
          ...this.state,
          currentFatherID: fatherID,
          subComments: data.message,
          subListLoading: false,
          subCommentLastId: data.message[data.message.length - 1].CommentId,
          noMoreSubComment: data.message.length < this.props.pageSize
        })
      }
    ).catch(
      (errorMessage) => {
        message.error('Loading fail')
        console.log(errorMessage)
        this.setState({...this.state, subListLoading: false})
      }
    )
  }

  openSubComment = (fatherID) => {
    this.setState({...this.state, subListLoading: true, currentFatherID: fatherID})
    this.getSubComment(fatherID)
    this.setState({...this.state, visible:true})
  }

  onClose = () => {
    this.setState({
      ...this.state,
      visible: false,
      subListLoading: true
    });
  }

  getDateFromId = (id) => {
    let beginIndex = 0
    for (let i = 0; i < 2; i++) {
      let index = id.indexOf('#', beginIndex)
      beginIndex = index + 1
    }
    let endIndex = id.indexOf('#', beginIndex + 1)
    let date = id.substr(beginIndex, (endIndex - beginIndex))
    let dateNum = parseInt(date)
    return new Date(dateNum)
  }

  onDeleteComment = (hostPage, commentId) => {
    confirm({
      title: 'Do you want to delete this comment?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can never get it back',
      onOk: ()=>{
        this.setState({...this.state, deleteLoading: true})
        const deleteURL = baseUrl + 'api/comment'
        const config = {
          params: {
            hostPage,
            commentId
          }
        }
        axios.delete(deleteURL, config).then((response) => {
          if (response.data.code === 200) {
            message.success('Delete success')
            this.setState({
              comments: [],
              subComments: [],
              visible: false,
              currentFatherID: null,
              mainListLoading: false,
              subListLoading: true,
              noMoreMainComment: true,
              noMoreSubComment: true,
              mainCommentLastId: '',
              subCommentLastId: '',
              mainMoreLoading: false,
              subMoreLoading: false,
              deleteLoading: false
            })
            this.onGetMainComment()
          }
        })
      }
    })

  }

  render() {
    const loadMore =
      !this.state.mainListLoading && !this.state.mainListLoading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button disabled = {this.state.noMoreMainComment} loading={this.state.mainMoreLoading} onClick={this.onLoadMore}>Loading more</Button>
        </div>
      ) : null;

    const subLoadMore =
      !this.state.subListLoading && !this.state.subListLoading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button disabled = {this.state.noMoreSubComment} loading={this.state.subMoreLoading} onClick={this.onLoadMoreSub}>Loading more</Button>
        </div>
      ) : null;
    const commentList = this.state.showList? (
      <div>
        <Drawer
          title="Sub Comments"
          placement="right"
          closable={false}
          width={'61.8%'}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <List
            loading = {this.state.subListLoading}
            itemLayout = "vertical"
            loadMore = {subLoadMore}
            dataSource = {this.state.subComments}
            renderItem = {item => (
              <List.Item>
                <div style={{marginBottom: '10px'}}>
                  <Card
                    style={{ width: '100%' }}
                    title={
                      <div>
                        {item.authorName}
                        <div style={{fontSize: '10px'}}>{this.getDateFromId(item.CommentId).toDateString()}</div>
                      </div>
                    }
                    extra={[<Button key={'1'} loading={this.state.deleteLoading} onClick={()=>{this.onDeleteComment(this.state.appKey + '#' + this.state.url, item.CommentId)}} danger={true}>Delete</Button> ]}
                  >
                    <div className="braft-output-content" dangerouslySetInnerHTML={{__html: BraftEditor.createEditorState(item.Content).toHTML()}}/>
                  </Card>
                </div>
              </List.Item>
            )}
          />
        </Drawer>
        <List
          loading = {this.state.mainListLoading}
          itemLayout = "horizontal"
          loadMore = {loadMore}
          dataSource = {this.state.comments}
          renderItem = {item => (
            <List.Item
              actions = {[<Button key={'1'} loading={this.state.deleteLoading} danger={true} onClick={()=>{this.onDeleteComment(this.state.appKey + '#' + this.state.url, item.CommentId)}}>Delete</Button>, <a key={'2'} onClick={()=> this.openSubComment(item.CommentId)}>sub-comment</a>]}
            >
              <List.Item.Meta
                style={{width: '20px'}}
                title={
                  <div>
                    {item.authorName}
                  </div>}
                description = {<div style={{fontSize: '10px'}}>{this.getDateFromId(item.CommentId).toDateString()}</div>}
              />
              <div>
                <div className="braft-output-content" dangerouslySetInnerHTML={{__html: BraftEditor.createEditorState(item.Content).toHTML()}}/>
              </div>
            </List.Item>
          )}
        />
      </div>
    ) : null
    return(
      <div style={{paddingTop: '50px'}}>
        <Title style={{fontFamily:'monospace', textAlign: 'center'}}>View Comment</Title>
        <Row>
          <Col span={3}/>
          <Col span={18}>
            <Row>
              <Col span={4}/>
              <Col span={14}>
                <Paragraph>Please enter your <Text mark={true}>url</Text>  and the <Text mark={true}>corresponding appKey</Text>  to manage the comments on that page</Paragraph>
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                >
                  <Form.Item
                  label="URL"
                  name="url"
                  rules={[{ required: true, message: 'Please enter your url!' }]}
                >
                  <Input />
                </Form.Item>

                  <Form.Item
                    label="AppKey"
                    name="appKey"
                    rules={[{ required: true, message: 'Please enter your appKey!' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item style={{textAlign: 'center'}}>
                    <Button type="primary" htmlType="submit">
                      OK
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col span={6}/>
            </Row>
            {commentList}
          </Col>
          <Col span={3}/>
        </Row>
        <div style={{height: '100px'}}/>
      </div>

    )
  }
}
