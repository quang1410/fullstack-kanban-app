const initState = {
  value: [],
};

const BoardStore = {
  state: initState,
  reducers: {
    setBoards(state, payload) {
      return {
        ...state,
        value: payload,
      };
    },
  },
  effects: () => ({}),
  selectors: () => ({}),
};

export default BoardStore;
