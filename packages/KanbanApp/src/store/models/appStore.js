const initState = {
  locale: 'en',
};

const AppStore = {
  state: initState,
  reducers: {
    setLocale(state, payload) {
      const { locale } = payload;
      localStorage.setItem('locale', locale);
      return {
        ...state,
        locale: locale,
      };
    },
  },
  effects: () => ({}),
  selectors: () => ({}),
};

export default AppStore;
