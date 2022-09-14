import { Box } from '@mui/material';
import { Loading } from 'components/Loading';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from 'services';
// import { useDispatch } from 'react-redux';
// import Sidebar from '../common/Sidebar';
// import { setUser } from '../../redux/features/userSlice';

const DefaultLayout = ({ children }) => {
  const history = useHistory();
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authService.isAuthenticated();
      console.log('user', user);
      if (!user) {
        history.push('/login');
      } else {
        // save user
        // dispatch(setUser(user));
        setLoading(false);
      }
    };
    checkAuth();
  }, [history]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <Box
      sx={{
        display: 'flex',
      }}
    >
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
