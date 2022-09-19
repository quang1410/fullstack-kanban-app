import API from 'utils/api';

class taskService {
  create = (boardId, params) => API.post(`boards/${boardId}/tasks`, params);

  updatePosition = (boardId, params) =>
    API.put(`boards/${boardId}/tasks/update-position`, params);

  delete = (boardId, taskId) => API.delete(`boards/${boardId}/tasks/${taskId}`);

  update = (boardId, taskId, params) =>
    API.put(`boards/${boardId}/tasks/${taskId}`, params);
}

export default new taskService();
