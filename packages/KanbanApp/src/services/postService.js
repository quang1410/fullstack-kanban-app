import API from 'utils/api';

class PostServive {
  getPost = async () => {
    const res = await API.get(`/posts?_start=0&_limit=10`);
    return res.data;
  };

  getPostByID = async () => {
    try {
      const res = await API.get(`/posts`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  setPost = async (data) => {
    try {
      const res = await API.post(`/posts`, data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  putPost = async (data) => {
    try {
      const res = await API.put(`/posts`, data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  deletePost = async (id) => {
    try {
      const res = await API.delete(`/posts/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
}

export default new PostServive();
