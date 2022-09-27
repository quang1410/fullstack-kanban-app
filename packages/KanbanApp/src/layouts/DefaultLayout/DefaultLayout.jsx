import { Box } from '@mui/material';
import { Loading } from 'components/Loading';
import { Sidebar } from 'components/Sidebar';
import { useDispatch, useSelector } from 'hooks';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { authService, boardService } from 'services';

const DefaultLayout = ({ children }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const { setInfomationUser, setFavorite, setBoards } = useDispatch(
    ({ UserStore, FavoriteStore, BoardStore }) => ({
      setInfomationUser: UserStore.setInfomation,
      setFavorite: FavoriteStore.setFavorite,
      setBoards: BoardStore.setBoards,
    }),
  );

  const { userInfomation, favoriteList, boards } = useSelector(
    ({ UserStore, FavoriteStore, BoardStore }) => ({
      userInfomation: UserStore.username,
      favoriteList: FavoriteStore.value,
      boards: BoardStore.value,
    }),
  );

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authService.isAuthenticated();
      if (!user) {
        history.push('/login');
      } else {
        setInfomationUser(user);
        setLoading(false);
      }
    };
    checkAuth();
  }, [history, setInfomationUser]);

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await boardService.getFavourites();
        setFavorite(res);
      } catch (err) {
        console.log(err);
      }
    };
    getBoards();
  }, [setFavorite]);

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await boardService.getAll();
        setBoards(res);
      } catch (error) {
        console.log('error', error);
      }
    };
    getBoards();
  }, [setBoards]);

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
      <Sidebar
        username={userInfomation}
        onLogout={handleLogout}
        setFavorite={setFavorite}
        favoriteList={favoriteList}
        updateFavouritePosition={boardService.updateFavouritePosition}
        setBoards={setBoards}
        boards={boards}
        updatePositionBoard={boardService.updatePositoin}
      />
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
