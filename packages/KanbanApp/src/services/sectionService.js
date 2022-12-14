import API from 'utils/api';

class sectionService {
  create = (boardId) => API.post(`boards/${boardId}/sections`);

  update = (boardId, sectionId, params) =>
    API.put(`boards/${boardId}/sections/${sectionId}`, params);

  delete = (boardId, sectionId) =>
    API.delete(`boards/${boardId}/sections/${sectionId}`);
}

export default new sectionService();
