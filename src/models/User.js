export default {
  namespace: 'USER',
  state: {
    logIn: true,
    userName: 'zzj',

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
