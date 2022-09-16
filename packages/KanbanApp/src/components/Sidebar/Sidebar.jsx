import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { colors } from 'styles/theme';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { boardService } from 'services';
import { useDispatch, useSelector } from 'hooks';
import { Link, useHistory, useParams } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Sidebar = ({ username, onLogout }) => {
  const { boardId } = useParams();
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);

  const { setBoards } = useDispatch(({ BoardStore }) => ({
    setBoards: BoardStore.setBoards,
  }));

  const { boards } = useSelector(({ BoardStore }) => ({
    boards: BoardStore.value,
  }));

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

  useEffect(() => {
    console.log('boards', boards);
    const activeItem = boards.findIndex((e) => e.id === boardId);
    if (boards.length > 0 && boardId === undefined) {
      history.push(`/boards/${boards[0].id}`);
    }
    setActiveIndex(activeItem);
  }, [boardId, boards, history]);

  const onDragEnd = async ({ source, destination }) => {
    const newList = [...boards];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);

    const activeItem = newList.findIndex((e) => e.id === boardId);
    setActiveIndex(activeItem);
    setBoards(newList);

    try {
      await boardService.updatePositoin({ boards: newList });
    } catch (err) {
      alert(err);
    }
  };

  const handleAddBoard = async () => {
    try {
      const res = await boardService.create();
      const newList = [res, ...boards];
      setBoards(newList);
      history.push(`/boards/${res.id}`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Drawer
      container={window.document.body}
      variant={'permanent'}
      open={true}
      sx={{
        width: 250,
        height: '100%',
        '& > div': { borderRight: 'none' },
      }}
    >
      <List
        disablePadding
        sx={{
          width: 250,
          height: '100vh',
          backgroundColor: colors.black45,
        }}
      >
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight={'700'}>
              {username}
            </Typography>
            <IconButton onClick={onLogout}>
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight={'700'}>
              Favorite
            </Typography>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight={'700'}>
              Private
            </Typography>
            <IconButton onClick={handleAddBoard}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            key={'list-board-droppable-key'}
            droppableId={'list-board-droppable'}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {boards.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItemButton
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        selected={index === activeIndex}
                        component={Link}
                        to={`/boards/${item.id}`}
                        sx={{
                          pl: '20px',
                          cursor: snapshot.isDragging
                            ? 'grab'
                            : 'pointer!important',
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.icon} {item.title}
                        </Typography>
                      </ListItemButton>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </Drawer>
  );
};

export default Sidebar;
