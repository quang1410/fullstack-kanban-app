import React, { useState } from 'react';

import { DefaultLayout } from 'layouts';
import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { boardService } from 'services';
import { useDispatch } from 'hooks';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { setBoards } = useDispatch(({ BoardStore }) => ({
    setBoards: BoardStore.setBoards,
  }));

  const handleCrearboard = async () => {
    setLoading(true);
    try {
      const res = await boardService.create();
      setBoards([res]);
      history.push(`/boards/${res.id}`);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DefaultLayout>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoadingButton
          variant="outlined"
          color="success"
          onClick={handleCrearboard}
          loading={loading}
        >
          Click here to create your first board
        </LoadingButton>
      </Box>
    </DefaultLayout>
  );
};

export default HomePage;
