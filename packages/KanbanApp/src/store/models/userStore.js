const initState = {
  id: '',
  username: '',
};

const UserStore = {
  state: initState,
  reducers: {
    setInfomation(state, payload) {
      const { username, id } = payload;
      return {
        ...state,
        username,
        id,
      };
    },
  },
  effects: () => ({}),
  selectors: () => ({}),
};

export default UserStore;
