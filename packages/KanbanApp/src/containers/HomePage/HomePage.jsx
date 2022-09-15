import React from 'react';

import { DefaultLayout } from 'layouts';
import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const HomePage = () => {
  const handleCrearboard = () => {};
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
        >
          Click here to create your first board
        </LoadingButton>
      </Box>
    </DefaultLayout>
  );
};

export default HomePage;
