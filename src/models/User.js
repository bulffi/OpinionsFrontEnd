import {baseUrl} from '../util/ConstStore';
import Post from '../util/Post';
import axios from 'axios'
import {message} from 'antd'
import Get from '../util/Get';
export default {
  namespace: 'USER',
  state: {
    logIn: false,
    userName: '',
    token: '',
    signUpStep: 0,
    resetStep: 0
  },
  reducers: {
    loggedIn(state, {payload}) {
      return {
        ...state,
        logIn: true,
        userName: payload.username,
        token: payload.token
      }
    },
    signUpNextStep(state, {payload}) {
      return {
        ...state,
        signUpStep: 1
      }
    },
    resetNextStep(state, {payload}) {
      return {
        ...state,
        resetStep: state.resetStep + 1
      }
    }
  },
  effects: {
    *signIn({ payload }, sagaEffect){
      const { call, put } = sagaEffect;
      const signInURL = baseUrl + 'api/signIn'
      const body = {
        UserName: payload.userName,
        PassWord: payload.userPassword
      }
      const data = yield call(Post, signInURL, body)
      if (data.code === 400) {
        console.log('login fail')
        message.error('Sign in fail')
      } else if (data.code === 200) {
        const loginData = {
          token: data.token,
          username: payload.userName
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        message.success('Welcome!')
        yield put({type: 'loggedIn', payload: loginData})
      }
    },
    *signUp({payload}, sagaEffect) {
      const { call, put } = sagaEffect;
      const signUpURL = baseUrl + 'api/signUp'
      const body = {
        UserName: payload.userName,
        PassWord: payload.userPassWord,
        Email: payload.userEmail
      }
      const data = yield call(Post, signUpURL, body)
      if (data.code === 400) {
        message.error('Sign up fail')
      } else if (data.code === 200) {
        message.success('Sign up success')
        yield put({type: 'signUpNextStep', payload: {}})
      }
    },
    *resetPassword({payload}, saga) {
      const {call, put} = saga
      const resetURL = baseUrl + 'api/resetPassword'
      const config = {
        params: {
          userName: payload.userName
        }
      }
      const data = yield call(Get, resetURL, config)
      if (data.code === 400) {
        message.error('Reset fail')
      } else if (data.code === 200) {
        message.success('Please check your email')
        yield put({type: 'resetNextStep', payload: {}})
      }
    },
    *resetConfirm({payload}, saga) {
      const {call, put} = saga
      const confirmURL = baseUrl + 'api/confirmReset'
      const body = {
        ConfirmCode: payload.code,
        NewPassWord: payload.userPassWord,
        UserName: payload.userName
      }
      const data = yield call(Post, confirmURL, body)
      if (data.code === 400) {
        message.error('Confirm fail')
      } else if (data.code === 200) {
        message.success('Reset succeed!')
        yield put({type: 'resetNextStep', payload: {}})
      }
    }
  }
}
