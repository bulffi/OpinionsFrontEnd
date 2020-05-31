import { baseUrl } from '../util/ConstStore';
import Get from '../util/Get';
import {message} from 'antd'
import Post from '../util/Post';

export default {
  namespace: 'AUDIT',
  state: {
    commentList:[],
    lastId: '',
    lastHost: '',
    noMoreComment: false,
    pageSize: 2,
    fatherContent: ''
  },
  reducers: {
    setFatherContent: (state, {payload}) => {
      return {
        ...state,
        fatherContent: payload.content
      }
    },
    setCommentList: (state, {payload}) => {
      return {
        ...state,
        commentList: payload.commentList
      }
    },
    resetCommentList: (state, {payload}) => {
      return {
        ...state,
        commentList: [],
        lastId: '',
        lastHost: '',
        noMoreComment: false
      }
    },
    setNoMoreComment: (state, {payload}) => {
      return {
        ...state,
        noMoreComment: payload.noMore
      }
    },
    setLastOne: (state, {payload}) => {
      return {
        ...state,
        lastId: payload.id,
        lastHost: payload.host
      }
    },
    deleteCommentFromList: (state, {payload}) => {
      let commentListCopy = [...state.commentList]
      commentListCopy = commentListCopy.filter((item) => {
        return item.commentId !== payload.commentId
      })
      if (commentListCopy.length !== 0) {
        const lastOne = commentListCopy[commentListCopy.length - 1]
        return {
          ...state,
          commentList: commentListCopy,
          lastId: lastOne.commentId,
          lastHost: lastOne.hostPage
        }
      } else {
        return {
          ...state,
          commentList: []
        }
      }
    }
  },
  effects: {
    *getCommentList({payload}, saga) {
      const {call, put} = saga
      const getCommentURL = baseUrl + 'api/audit'
      const config = {
        params: {
          pageSize: payload.pageSize,
          lastId: payload.lastId,
          lastHost: payload.lastHost
        }
      }
      const data = yield call(Get, getCommentURL, config)
      if (data.code === 200) {
        message.success('Load success')
        if (data.comments.length < payload.pageSize) {
          yield put({type: 'setNoMoreComment', payload: {noMore: true}})
        }
        if (data.comments.length !== 0) {
          const lastId = data.comments[data.comments.length - 1].commentId
          const lastHost = data.comments[data.comments.length - 1].hostPage
          yield put({type: 'setLastOne', payload: {id: lastId, host: lastHost}})
        }
        yield put({type: 'setCommentList', payload: {commentList: data.comments}})
      }
    },
    *passComment({payload}, saga) {
      const {call, put} = saga
      const passCommentURL = baseUrl + 'api/audit/pass'
      const data = yield call(Post, passCommentURL, payload.comment)
      if (data.code === 200) {
        message.success('Pass success')
        yield put({type: 'deleteCommentFromList', payload: {commentId: payload.comment.commentId}})
      }
    },
    *denyComment({payload}, saga) {
      const {call, put} = saga
      const denyCommentURL = baseUrl + 'api/audit/deny'
      const config  ={
        params: {
          hostPage: payload.hostPage,
          commentId: payload.commentId
        }
      }
      const data = yield call(Post, denyCommentURL, null, config)
      if (data.code === 200) {
        message.success('Deny success')
        yield put({type: 'deleteCommentFromList', payload: {commentId: payload.commentId}})
      }
    }
  }
}
