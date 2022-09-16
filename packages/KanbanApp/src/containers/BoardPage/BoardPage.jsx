import { Box, IconButton, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'hooks';
import { DefaultLayout } from 'layouts';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { boardService } from 'services';
import { EmojiPicker } from 'components/EmojiPicker';

const timeout = 500;
let timer;

const BoardPage = () => {
  const { boardId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [icon, setIcon] = useState('');

  const { boards } = useSelector(({ BoardStore }) => ({
    boards: BoardStore.value,
  }));

  const { setBoards } = useDispatch(({ BoardStore }) => ({
    setBoards: BoardStore.setBoards,
  }));

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await boardService.getOne(boardId);
        setTitle(res.title);
        setDescription(res.description);
        setSections(res.sections);
        setIsFavourite(res.favourite);
        setIcon(res.icon);
      } catch (err) {
        alert(err);
      }
    };
    getBoard();
    console.log('boards', boards);
    console.log('icon', icon);
    console.log('sections', sections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId]);

  const onIconChange = async (newIcon) => {
    let temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], icon: newIcon };

    // if (isFavourite) {
    //   let tempFavourite = [...favouriteList];
    //   const favouriteIndex = tempFavourite.findIndex((e) => e.id === boardId);
    //   tempFavourite[favouriteIndex] = {
    //     ...tempFavourite[favouriteIndex],
    //     icon: newIcon,
    //   };
    //   dispatch(setFavouriteList(tempFavourite));
    // }

    setIcon(newIcon);
    setBoards(temp);
    try {
      await boardService.update(boardId, { icon: newIcon });
    } catch (err) {
      alert(err);
    }
  };

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    let temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], title: newTitle };

    // if (isFavourite) {
    //   let tempFavourite = [...favouriteList]
    //   const favouriteIndex = tempFavourite.findIndex(e => e.id === boardId)
    //   tempFavourite[favouriteIndex] = { ...tempFavourite[favouriteIndex], title: newTitle }
    //   dispatch(setFavouriteList(tempFavourite))
    // }

    setBoards(temp);

    timer = setTimeout(async () => {
      try {
        await boardService.update(boardId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);
    timer = setTimeout(async () => {
      try {
        await boardService.update(boardId, { description: newDescription });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const addFavourite = async () => {
    try {
      await boardService.update(boardId, { favourite: !isFavourite });
      // let newFavouriteList = [...favouriteList]
      // if (isFavourite) {
      //   newFavouriteList = newFavouriteList.filter(e => e.id !== boardId)
      // } else {
      //   newFavouriteList.unshift(board)
      // }
      // dispatch(setFavouriteList(newFavouriteList))
      setIsFavourite(!isFavourite);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <DefaultLayout>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <IconButton variant="outlined" onClick={addFavourite}>
          {isFavourite ? (
            <StarOutlinedIcon color="warning" />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={() => {}}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '10px 50px' }}>
        <Box>
          {/* emoji picker */}
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            value={title}
            onChange={updateTitle}
            placeholder="Untitled"
            variant="outlined"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input': { padding: 0 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
              '& .MuiOutlinedInput-root': {
                fontSize: '2rem',
                fontWeight: '700',
              },
            }}
          />
          <TextField
            value={description}
            onChange={updateDescription}
            placeholder="Add a description"
            variant="outlined"
            multiline
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input': { padding: 0 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
              '& .MuiOutlinedInput-root': { fontSize: '0.8rem' },
            }}
          />
        </Box>
        {/* <Box>
          <Kanban data={sections} boardId={boardId} />
        </Box> */}
      </Box>
    </DefaultLayout>
  );
};

export default BoardPage;
