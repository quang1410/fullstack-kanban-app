import API from 'utils/api';

class AuthServive {
  signup = (params) => API.post('auth/signup', params);

  login = (params) => API.post('auth/login', params);

  verifyToken = () => API.post('auth/verify-token');

  isAuthenticated = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const res = await this.verifyToken();
      return res.user;
    } catch {
      return false;
    }
  };
}

export default new AuthServive();
