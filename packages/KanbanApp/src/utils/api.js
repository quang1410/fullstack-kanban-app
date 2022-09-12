import axios from 'axios';
import { URL_SERVER_HOST } from 'utils/constants';

const API = axios.create({
  baseURL: URL_SERVER_HOST,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

API.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    // TODO: Handle global error, 401, 403....
    const errorResponse = err.response.data;

    switch (errorResponse.statusCode) {
      // case 401:
      // case 403:
      //   store.dispatch.authentication.logout();
      //   return;

      // case 400:
      //   return Promise.reject(err.response);

      default: {
        const errors = errorResponse?.data?.errors;
        const message = errors
          ? errors[Object.keys(errors)[0]][0]
          : errorResponse.message;
        return Promise.reject(message);
      }
    }
  },
);

export default API;
