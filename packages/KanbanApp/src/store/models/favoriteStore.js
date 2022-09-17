const initState = {
  value: [],
};

const FavoriteStore = {
  state: initState,
  reducers: {
    setFavorite(state, payload) {
      return {
        ...state,
        value: payload,
      };
    },
  },
  effects: () => ({}),
  selectors: () => ({}),
};

export default FavoriteStore;
