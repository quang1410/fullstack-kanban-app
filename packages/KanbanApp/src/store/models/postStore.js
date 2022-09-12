import { postService } from 'services';

const initState = {};

const PostStore = {
  state: initState,
  reducers: {
    setPost(state, payload) {
      return {
        ...state,
        data: payload,
      };
    },
  },
  effects: () => ({
    async getPost() {
      try {
        const data = await postService.getPost();
        this.setPost(data);
      } catch (error) {
        console.log('error:', error);
      }
    },
  }),
  selectors: (slice, createSelector) => ({
    slectPost() {
      return slice((post) => post.data);
    },
    slectPostCreateSelector() {
      return createSelector(this.slectPost, (posts) => posts);
    },
  }),
};

export default PostStore;
