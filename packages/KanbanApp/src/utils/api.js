import axios from 'axios';
import queryString from 'query-string';

const API = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  paramsSerializer: (params) => queryString.stringify({ params }),
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (res) => {
    if (res && res.data) return res.data;
  },
  (err) => {
    console.log(err);
    // TODO: Handle global error, 401, 403....
    const errorResponse = err.response;
    switch (errorResponse.status) {
      case 401:
        return Promise.reject(err.response);
      // case 403:
      //   store.dispatch.authentication.logout();
      //   return;

      case 400:
        return Promise.reject(err.response);

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
