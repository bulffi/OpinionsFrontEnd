export default {
  namespace: 'test',
  state: {
    count: 0,
  },
  reducers: {
    increment(state, {payload: newNumber}) {
      return {
        count: state.count + newNumber
      }
    },
  },
}
