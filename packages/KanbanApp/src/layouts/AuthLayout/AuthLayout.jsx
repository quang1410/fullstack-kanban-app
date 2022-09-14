import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import assets from 'assets';
import { authService } from 'services';
import { useHistory } from 'react-router-dom';
import { Loading } from 'components/Loading';

const AuthLayout = ({ children }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authService.isAuthenticated();
      if (!isAuth) {
        setLoading(false);
      } else {
        history.push('/');
      }
    };
    checkAuth();
  }, [history]);
  return loading ? (
    <Loading fullHeight />
  ) : (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          src={assets.images.logoDark}
          style={{ width: '100px' }}
          alt="app logo"
        />
        {children}
      </Box>
    </Container>
  );
};

export default AuthLayout;
