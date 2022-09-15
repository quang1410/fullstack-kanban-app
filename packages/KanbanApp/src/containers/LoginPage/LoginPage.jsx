import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { authService } from 'services';
import { AuthLayout } from 'layouts';
import { useDispatch } from 'hooks';

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');

  const { setInfomationUser } = useDispatch(({ UserStore }) => ({
    setInfomationUser: UserStore.setInfomation,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText('');
    setPasswordErrText('');

    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();

    let err = false;

    if (username === '') {
      err = true;
      setUsernameErrText('Please fill this field');
    }
    if (password === '') {
      err = true;
      setPasswordErrText('Please fill this field');
    }

    if (err) return;

    setLoading(true);

    try {
      const res = await authService.login({ username, password });
      setLoading(false);
      localStorage.setItem('token', res.token);
      setInfomationUser(res.user);
      history.push('/');
    } catch (err) {
      const errors = err.data.errors;
      errors.forEach((e) => {
        if (e.param === 'username') {
          setUsernameErrText(e.msg);
        }
        if (e.param === 'password') {
          setPasswordErrText(e.msg);
        }
      });
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          disabled={loading}
          error={usernameErrText !== ''}
          helperText={usernameErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          disabled={loading}
          error={passwordErrText !== ''}
          helperText={passwordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Login
        </LoadingButton>
      </Box>
      <Button component={Link} to="/signup" sx={{ textTransform: 'none' }}>
        You do not have an account? Signup
      </Button>
    </AuthLayout>
  );
};

export default Login;
