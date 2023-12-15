import { useDispatch, useSelector } from 'react-redux';

import servicesApi from '../api/servicesApi';
import {
  setGroupsInStore,
  clearErrorMessage,
  setError,
  setMyPublicationsStore,
  seAllPublications,
  setPublicationsOfGroup,
  addPublicationToState,
  deletePublicationStore,
  updatePublicationStore,
  addOnePubliactionWithSocket,
  setPagesProfile,
  createCommentStore,
  createLikeStore,
  setNotificationsStore,
  // seAllPublicationsPaginated,
} from '../store/groups/groupSlice';

import { onLogin } from '../store/auth/authSlice';

export const useGroupsStore = () => {
  const { groups, errorMessage } = useSelector((state) => state.group);
  const { onLogout } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getGroups = async () => {
    const token = localStorage.getItem('token');

    try {
      const { data } = await servicesApi.getGroups(token);
      dispatch(setGroupsInStore(data.groups));

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const joinGroup = async (groupId) => {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('idUser');

    try {
      const { data } = await servicesApi.joinGroup(idUser, groupId, token);
      dispatch(onLogin(data.user));
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const getProfilePublicatios = async (page) => {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('idUser');
    try {
      const { data } = await servicesApi.getMyPublications(token, idUser, page);
      dispatch(setMyPublicationsStore(data.publicaciones));
      dispatch(setPagesProfile(data.totalPages));
      console.log('profile', data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllPublications = async (page) => {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('idUser');

    try {
      const { data } = await servicesApi.getAllPublications(
        token,
        idUser,
        page,
      );

      console.log(data);
      dispatch(seAllPublications(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getPublicationsOfGroup = async (id, page) => {
    const token = localStorage.getItem('token');
    try {
      const resp = await servicesApi.getPublicationsOfGroup(id, token, page);
      resp.data.groupId = id;
      console.log(resp);
      dispatch(setPublicationsOfGroup(resp.data));

      // await getAllPublications();
    } catch (error) {
      console.log(error);
    }
  };

  const addNewPublication = async (formData) => {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('idUser');

    try {
      console.log(formData);

      const { data } = await servicesApi.createPublication(
        idUser,
        formData,
        token,
      );
      console.log(data);

      dispatch(addPublicationToState(data.publication));

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const deletePublication = async (idPublication) => {
    const token = localStorage.getItem('token');
    try {
      const resp = await servicesApi.deletePublication(token, idPublication);
      dispatch(deletePublicationStore(idPublication));
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePublication = async (idPublication, formData) => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await servicesApi.updatePublication(
        idPublication,
        formData,
        token,
      );
      dispatch(updatePublicationStore(data.publication));
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (formData) => {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('idUser');
    try {
      const { data } = await servicesApi.createComment(idUser, formData, token);
      console.log(data);
      dispatch(createCommentStore(data.comments));
      // dispatch(updatePublicationStore(data.publication));
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const createRespFather = async (formData) => {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('idUser');
    try {
      const { data } = await servicesApi.createRespCommentFather(
        idUser,
        formData,
        token,
      );
      console.log(data);
      dispatch(createCommentStore(data.comments));

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (idPublication) => {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('idUser');
    try {
      const { data } = await servicesApi.createLike(
        idUser,
        idPublication,
        token,
      );
      console.log(data);
      dispatch(createLikeStore(data));
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteLike = async (idPublication) => {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('idUser');
    try {
      const { data } = await servicesApi.deleteLike(
        idUser,
        idPublication,
        token,
      );
      dispatch(createLikeStore(data));
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotifications = async () => {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('idUser');
    try {
      const { data } = await servicesApi.notifications(idUser, token);
      dispatch(setNotificationsStore(data.notifications));
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    errorMessage,
    groups,

    //* Métodos
    getGroups,
    joinGroup,
    getProfilePublicatios,
    getAllPublications,
    getPublicationsOfGroup,
    addNewPublication,
    deletePublication,
    updatePublication,
    createComment,
    createRespFather,
    handleLike,
    handleDeleteLike,
    handleNotifications,
    // useSocket,
  };
};
