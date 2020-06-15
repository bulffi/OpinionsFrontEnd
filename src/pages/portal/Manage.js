import React from 'react';
import { Row, Col, Typography, Card, List, Button, notification } from 'antd';
import { connect } from 'umi';
const { Title } = Typography;
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import Get from '../../util/Get';
import { baseUrl } from '../../util/ConstStore';

const mapStateToProps = state => {
  const {
    commentList,
    fatherContent,
    noMoreComment,
    pageSize,
    lastId,
    lastHost,
  } = state['AUDIT'];
  const { userId } = state['USER'];
  return {
    commentList,
    noMoreComment,
    pageSize,
    lastId,
    lastHost,
    fatherContent,
    userId,
    loading: state.loading.models.AUDIT,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInit: (pageSize, lastId, lastHost, userId) => {
      const action = {
        type: 'AUDIT/getCommentList',
        payload: {
          pageSize,
          lastId,
          lastHost,
          userId,
        },
      };
      dispatch(action);
    },
    onDestroy: () => {
      const action = {
        type: 'AUDIT/resetCommentList',
        payload: {},
      };
      dispatch(action);
    },
    onPass: comment => {
      const action = {
        type: 'AUDIT/passComment',
        payload: {
          comment,
        },
      };
      dispatch(action);
    },
    onDeny: (hostPage, commentId) => {
      const action = {
        type: 'AUDIT/denyComment',
        payload: {
          hostPage,
          commentId,
        },
      };
      dispatch(action);
    },
    onMoreComment: (pageSize, lastId, lastHost, userId) => {
      const action = {
        type: 'AUDIT/getCommentList',
        payload: {
          pageSize,
          lastId,
          lastHost,
          userId,
        },
      };
      dispatch(action);
    },
    onChangeFatherContent: content => {
      const action = {
        type: 'AUDIT/setFatherContent',
        payload: {
          content,
        },
      };
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Manage extends React.Component {
  state = {
    fatherLoading: false,
    rate: 0,
  };

  componentDidMount() {
    this.props.onInit(
      this.props.pageSize,
      this.props.lastId,
      this.props.lastHost,
      this.props.userId,
    );
    const getPassStatURL = baseUrl + 'api/query';
    Get(getPassStatURL).then(data => {
      console.log(data);
      if (data.code === 200) {
        this.setState({ ...this.state, rate: data.rate });
      }
    });
  }
  componentWillUnmount() {
    this.props.onDestroy();
  }

  passComment = comment => {
    console.log(comment);
    const lengthBefore = this.props.commentList.length;
    this.props.onPass(comment);
    if (lengthBefore === 1) {
      console.log('need more');
      this.props.onMoreComment(
        this.props.pageSize,
        this.props.lastId,
        this.props.lastHost,
        this.props.userId,
      );
    }
  };

  denyComment = comment => {
    console.log(comment);
    const lengthBefore = this.props.commentList.length;
    this.props.onDeny(comment.hostPage, comment.commentId);
    if (lengthBefore === 1) {
      this.props.onMoreComment(
        this.props.pageSize,
        this.props.lastId,
        this.props.lastHost,
        this.props.userId,
      );
    }
  };

  getURLFromId = host => {
    let sharpId = host.indexOf('#');
    return host.substr(sharpId + 1, host.length - sharpId);
  };

  getFatherContent = async (hostPage, commentId) => {
    const getCommentURL = baseUrl + 'api/comment';
    const data = await Get(getCommentURL, { params: { hostPage, commentId } });
    // console.log(data)
    // this.props.onChangeFatherContent(data.content)
    this.setState({ ...this.state, fatherLoading: false });
    return data.content;
  };

  onViewFather = async comment => {
    this.setState({ ...this.state, fatherLoading: true });
    const content = await this.getFatherContent(
      comment.hostPage,
      comment.fatherID,
    );
    const contentObj = JSON.parse(content);
    console.log(contentObj);
    notification.open({
      message: 'Father comment',
      description: contentObj.blocks[0].text,
      duration: 5,
    });
  };

  getCardExtra = comment => {
    const viewSource = (
      <a key={'0'} target="_blank" href={this.getURLFromId(comment.hostPage)}>
        {this.getURLFromId(comment.hostPage)}
      </a>
    );
    let slashIndex = comment.commentId.indexOf('#');
    let defineChar = comment.commentId.charAt(slashIndex + 1);
    if (defineChar === 'S') {
      const viewFather = (
        <div key={'1'}>
          <Button
            loading={this.state.fatherLoading}
            onClick={() => this.onViewFather(comment)}
            type={'dashed'}
          >
            View Father
          </Button>
        </div>
      );
      return [viewFather, viewSource];
    }
    return [viewSource];
  };

  render() {
    return (
      <div style={{ paddingTop: '50px' }}>
        <Title
          style={{
            fontFamily: 'monospace',
            fontSize: '30px',
            textAlign: 'center',
          }}
        >
          Comments To Audit [History pass rate: {this.state.rate * 100} %]
        </Title>
        <Row>
          <Col span={3} />
          <Col span={18}>
            <List
              loading={this.props.loading}
              dataSource={this.props.commentList}
              renderItem={item => (
                <div style={{ paddingBottom: '20px' }}>
                  <Card
                    title={item.authorName + '  [' + item.email + ']'}
                    extra={this.getCardExtra(item)}
                    actions={[
                      <div>
                        <Button
                          size={'small'}
                          type={'primary'}
                          onClick={() => this.passComment(item)}
                        >
                          OK
                        </Button>
                      </div>,
                      <div>
                        <Button
                          size={'small'}
                          type={'primary'}
                          danger={true}
                          onClick={() => this.denyComment(item)}
                        >
                          Deny
                        </Button>{' '}
                      </div>,
                    ]}
                  >
                    <div
                      className="braft-output-content"
                      dangerouslySetInnerHTML={{
                        __html: BraftEditor.createEditorState(
                          item.content,
                        ).toHTML(),
                      }}
                    />
                  </Card>
                </div>
              )}
            />
            {/*{this.state.commentToJudge.map(((value, index) => {*/}
            {/*    return(*/}
            {/*      */}
            {/*    )*/}
            {/*}))}*/}
          </Col>
          <Col span={3} />
        </Row>
        <div style={{ height: '100px' }} />
      </div>
    );
  }
}
