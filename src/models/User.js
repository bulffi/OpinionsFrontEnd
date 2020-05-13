export default {
  namespace: 'USER',
  state: {
    logIn: false,
    userName: '',

  },
  reducers: {
    loggedIn(state, {payload:userName}) {
      return {
        ...state,
        logIn: true,
        userName,
      }
    },

  },
  effects: {

  }
}
