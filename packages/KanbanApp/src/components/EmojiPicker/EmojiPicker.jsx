import { Box, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useOnClickOutside } from 'hooks';

const EmojiPicker = ({ icon, onChange }) => {
  const ref = useRef();
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  useOnClickOutside(ref, () => setIsShowPicker(false));

  useEffect(() => {
    setSelectedEmoji(icon);
  }, [icon]);

  const selectEmoji = (e) => {
    const sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    onChange(emoji);
  };

  const showPicker = () => setIsShowPicker(!isShowPicker);

  return (
    <Box sx={{ position: 'relative', width: 'max-content' }}>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: 'pointer' }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? 'block' : 'none',
          position: 'absolute',
          top: '100%',
          zIndex: '9999',
        }}
        ref={ref}
      >
        <Picker
          data={data}
          theme="dark"
          onEmojiSelect={selectEmoji}
          showPreview={false}
        />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
