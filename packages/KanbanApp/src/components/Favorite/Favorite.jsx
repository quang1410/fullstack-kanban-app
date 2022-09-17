import { Box, ListItem, ListItemButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { useParams, Link } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { boardService } from 'services';

const FavoriteList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { boardId } = useParams();

  const { setFavorite } = useDispatch(({ FavoriteStore }) => ({
    setFavorite: FavoriteStore.setFavorite,
  }));

  const { favoriteList } = useSelector(({ FavoriteStore }) => ({
    favoriteList: FavoriteStore.value,
  }));

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
    const index = favoriteList.findIndex((e) => e.id === boardId);
    setActiveIndex(index);
  }, [favoriteList, boardId]);

  const onDragEnd = async ({ source, destination }) => {
    const newFavoriteListList = [...favoriteList];
    const [removed] = newFavoriteListList.splice(source.index, 1);
    newFavoriteListList.splice(destination.index, 0, removed);

    const activeItem = newFavoriteListList.findIndex((e) => e.id === boardId);
    setActiveIndex(activeItem);

    setFavorite(newFavoriteListList);

    try {
      await boardService.updateFavouritePosition({
        boards: newFavoriteListList,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ListItem>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" fontWeight="700">
            Favourites
          </Typography>
        </Box>
      </ListItem>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={'list-board-droppable-key'}
          droppableId={'list-board-droppable'}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {favoriteList.map((item, index) => (
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
    </>
  );
};

export default FavoriteList;
