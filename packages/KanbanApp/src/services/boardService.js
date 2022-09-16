import API from 'utils/api';

class BoardServive {
  create = () => API.post('boards');

  getAll = () => API.get('boards');

  updatePositoin = (params) => API.put('boards', params);

  getOne = (id) => API.get(`boards/${id}`);

  delete = (id) => API.delete(`boards/${id}`);

  update = (id, params) => API.put(`boards/${id}`, params);

  getFavourites = () => API.get('boards/favourites');

  updateFavouritePosition = (params) => API.put('boards/favourites', params);
}

export default new BoardServive();
