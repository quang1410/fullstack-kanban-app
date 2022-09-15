import { Box } from '@mui/material';
import { Loading } from 'components/Loading';
import { Sidebar } from 'components/Sidebar';
import { useDispatch, useSelector } from 'hooks';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from 'services';

const DefaultLayout = ({ children }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const { setInfomationUser } = useDispatch(({ UserStore }) => ({
    setInfomationUser: UserStore.setInfomation,
  }));

  const { userInfomation } = useSelector(({ UserStore }) => ({
    userInfomation: UserStore.username,
  }));

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authService.isAuthenticated();
      console.log('user', user);
      if (!user) {
        history.push('/login');
      } else {
        setInfomationUser(user);
        setLoading(false);
      }
    };
    checkAuth();
  }, [history, setInfomationUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return loading ? (
    <Loading fullHeight />
  ) : (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Sidebar username={userInfomation} onLogout={handleLogout} />
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          width: 'max-content',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DefaultLayout;
