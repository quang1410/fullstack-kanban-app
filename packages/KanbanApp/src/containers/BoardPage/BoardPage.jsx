import { Box, IconButton, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'hooks';
import { DefaultLayout } from 'layouts';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { boardService, sectionService, taskService } from 'services';
import { EmojiPicker } from 'components/EmojiPicker';
import { Kanban } from 'components/Kanban';
import { UploadImage } from 'components/UploadImage';
import userProfileImg from 'assets/images/ic-18-18-userprofile.svg';
import axios from 'axios';

const timeout = 500;
let timer;
const maxSizeFile = 10 * 1024 * 1024; // 10mb

const BoardPage = () => {
  const { boardId } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [icon, setIcon] = useState('');
  const [urlImg, setUrlImg] = useState(() => userProfileImg);

  const { boards, favoriteList } = useSelector(
    ({ BoardStore, FavoriteStore }) => ({
      boards: BoardStore.value,
      favoriteList: FavoriteStore.value,
    }),
  );

  const { setBoards, setFavorites } = useDispatch(
    ({ BoardStore, FavoriteStore }) => ({
      setBoards: BoardStore.setBoards,
      setFavorites: FavoriteStore.setFavorite,
    }),
  );

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
        console.log(err);
      }
    };
    getBoard();
  }, [boardId]);

  const onIconChange = async (newIcon) => {
    let temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], icon: newIcon };

    if (isFavourite) {
      let tempFavourite = [...favoriteList];
      const favouriteIndex = tempFavourite.findIndex((e) => e.id === boardId);
      tempFavourite[favouriteIndex] = {
        ...tempFavourite[favouriteIndex],
        icon: newIcon,
      };
      setFavorites(tempFavourite);
    }

    setIcon(newIcon);
    setBoards(temp);
    try {
      await boardService.update(boardId, { icon: newIcon });
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    let temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], title: newTitle };

    if (isFavourite) {
      let tempFavourite = [...favoriteList];
      const favouriteIndex = tempFavourite.findIndex((e) => e.id === boardId);
      tempFavourite[favouriteIndex] = {
        ...tempFavourite[favouriteIndex],
        title: newTitle,
      };
      setFavorites(tempFavourite);
    }

    setBoards(temp);

    timer = setTimeout(async () => {
      try {
        await boardService.update(boardId, { title: newTitle });
      } catch (err) {
        console.log(err);
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
        console.log(err);
      }
    }, timeout);
  };

  const addFavourite = async () => {
    try {
      const board = await boardService.update(boardId, {
        favourite: !isFavourite,
      });
      let newFavouriteList = [...favoriteList];
      if (isFavourite) {
        newFavouriteList = newFavouriteList.filter((e) => e.id !== boardId);
      } else {
        newFavouriteList.unshift(board);
      }
      setFavorites(newFavouriteList);
      setIsFavourite(!isFavourite);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBoard = async () => {
    try {
      await boardService.delete(boardId);
      if (isFavourite) {
        const newFavouriteList = favoriteList.filter((e) => e.id !== boardId);
        setFavorites(newFavouriteList);
      }

      const newList = boards.filter((e) => e.id !== boardId);
      if (newList.length === 0) {
        history.push('/boards');
      } else {
        history.push(`/boards/${newList[0].id}`);
      }
      setBoards(newList);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangePicture = (e) => {
    const { value, files = {} } = (e && e.target) || {}; //return e.target
    const file = files[0];
    const reader = new FileReader();
    const formData = new FormData();
    if (value && file) {
      if (file.size > maxSizeFile) {
        console.log('error', file.size, maxSizeFile);
      } else {
        // const fileName = file.name;
        reader.onloadend = async function () {
          // const fileData = {
          //   file,
          //   fileUrl: e.target.result,
          //   fileName,
          // };
          axios
            .post('https://jella.xyz/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
              },
            })
            .then((response) => {
              setUrlImg(response.data[0]?.url);
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        };
        reader.readAsText(file);
      }
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
        <IconButton variant="outlined" color="error" onClick={deleteBoard}>
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
          <UploadImage src={urlImg} onChange={onChangePicture} />
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
        <Box>
          <Kanban
            dataSections={sections}
            boardId={boardId}
            updatePositionTask={taskService.updatePosition}
            createNewSection={sectionService.create}
            deleteSectionService={sectionService.delete}
            updateSection={sectionService.update}
            createTaskService={taskService.create}
            deleteTaskService={taskService.delete}
            updateTaskService={taskService.update}
          />
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default BoardPage;
