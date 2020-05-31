import { baseUrl } from '../util/ConstStore';
import Get from '../util/Get';
import Post from '../util/Post';
import {message} from 'antd'
import Delete from '../util/Delete';

export default {
  namespace: 'DOMAIN',
  state: {
    currentDomains: [],
    totalDomain: 0,
    currentPage: 1,
    newAppKey: ''
  },
  reducers: {
    setTotalDomain: (state, {payload}) => {
      return {
        ...state,
        totalDomain: payload.total
      }
    },
    setCurrentDomainList: (state, {payload}) => {
      return {
        ...state,
        currentDomains: payload.domainList
      }
    },
    setPageIndex: (state, {payload}) => {
      return {
        ...state,
        currentPage: payload.pageIndex
      }
    },
    setNewAppKey: (state, {payload}) => {
      return {
        ...state,
        newAppKey: payload.newAppKey
      }
    }
  },
  effects: {
    *getInitDomainList({payload}, saga){
      const { call, put } = saga;
      const domainCountURL = baseUrl + 'api/domain/total'
      const data = yield call(Get, domainCountURL)
      console.log(data)
      if (data.code === 200){
        yield put({type: 'setTotalDomain', payload: {total: data.count}})
        yield put({type: 'getDomainList', payload: {pageSize: payload.pageSize, lastId: null}})
      }
    },
    *getDomainList({payload}, saga){
      const { call, put } = saga;
      const domainPageURL = baseUrl + 'api/domain'
      const config = {
        params: {
          pageSize: payload.pageSize,
          lastId: payload.lastId
        }
      }
      const domainList = yield call(Get, domainPageURL, config)
      console.log(domainList)
      if (domainList.code === 200) {
        yield put({type: 'setCurrentDomainList', payload: {domainList: domainList.items}})
      }
    },
    *addNewDomain({payload}, saga) {
      const { call, put } = saga;
      const addDomainURL = baseUrl + 'api/domain'
      const config = {
        params: {
          newDomain: payload.newDomain
        }
      }
      const data = yield call(Post, addDomainURL, null, config)
      console.log(data)
      if (data.code === 200) {
        message.success('Please check your appKey!')
        yield put({type: 'setNewAppKey', payload: {newAppKey: data.appKey}})
      }
    },
    *deleteDomain({payload}, saga){
      const { call, put } = saga;
      const deleteDomainURL = baseUrl + 'api/domain'
      const config = {
        params: {
          domainId: payload.appKey
        }
      }
      const data = yield call(Delete, deleteDomainURL, config)
      console.log(data)
      if (data.code === 200) {
        message.success('Delete Success')
        yield put({type: 'getInitDomainList', payload:{pageSize:payload.pageSize}})
      }
    }
  }
}
