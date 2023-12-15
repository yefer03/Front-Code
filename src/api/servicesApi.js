import api from '../lib/axios';
import axios from 'axios';

export default {
  createUser(user) {
    return api.post('/auth/register', user);
  },
  loginUser(user) {
    return api.post('/auth/login', user);
  },
  getDataUser(token) {
    return api.get('/home', {
      headers: {
        token: token,
      },
    });
  },
  updateUser(data, token, uid) {
    return api.put(`/configuration/update/data/${uid}`, data, {
      headers: {
        token: token,
      },
    });
  },
  setImagesUser(image, token, _id, ruta) {
    return api.put(`/profile/update/${ruta}/${_id}`, image, {
      headers: {
        token: token,
      },
    });
  },
  getGroups(token) {
    return api.get('/group/get', {
      headers: {
        token: token,
      },
    });
  },
  joinGroup(idUser, groupId, token) {
    const data = {
      groupId,
    };
    return api.post(`/group/join/${idUser}`, data, {
      headers: {
        token: token,
      },
    });
  },

  getMyPublications(token, idUser, page) {
    return api.get(`/publication/all/user/${idUser}?page=${page}`, {
      headers: {
        token: token,
      },
    });
  },

  getPublicationsOfGroup(id, token, page) {
    return api.get(`/publication/one/${id}?page=${page}`, {
      headers: {
        token: token,
      },
    });
  },

  getAllPublications(token, idUser, page) {
    return api.get(`/publication/all/groups/${idUser}/?page=${page}`, {
      headers: {
        token: token,
      },
    });
  },

  createPublication(idUser, formData, token) {
    return api.post(
      `/publication/new/${idUser}`,

      formData,

      {
        headers: {
          token: token,
        },
      },
    );
  },

  deletePublication(token, idPublication) {
    return api.delete(`publication/delete/${idPublication}`, {
      headers: {
        token: token,
      },
    });
  },

  getDataUserVisit(idUser, token) {
    return api.get(`profile/visit/${idUser}`, {
      headers: {
        token: token,
      },
    });
  },
  leaveGroup(idUser, token, groupId) {
    return api.put(
      `group/leave/${idUser}`,
      { groupId },
      {
        headers: {
          token: token,
        },
      },
    );
  },
  updatePublication(idPublication, formData, token) {
    return api.put(`/publication/update/${idPublication}`, formData, {
      headers: {
        token: token,
      },
    });
  },
  createComment(idUser, data, token) {
    return api.post(`/comment/new/${idUser}`, data, {
      headers: {
        token: token,
      },
    });
  },
  createRespCommentFather(idUser, data, token) {
    return api.post(`/comment/reply/${idUser}`, data, {
      headers: {
        token: token,
      },
    });
  },
  createLike(idUser, idPublication, token) {
    return api.put(
      `like/add/${idUser}`,
      { idPublication },
      {
        headers: {
          token: token,
        },
      },
    );
  },
  deleteLike(idUser, idPublication, token) {
    return api.put(
      `like/remove/${idUser}`,
      { idPublication },
      {
        headers: {
          token: token,
        },
      },
    );
  },
  notifications(idUser, token) {
    return api.get(`notification/all/${idUser}`, {
      headers: {
        token: token,
      },
    });
  },
};
