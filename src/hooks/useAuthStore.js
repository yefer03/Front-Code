import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrorMessage,
  leaveGroupStore,
  onChecking,
  onLogin,
  onLogout,
  setError,
  setImageUserBanner,
  setImageUserProfile,
  setUserVisit,
} from '../store/auth/authSlice';

import servicesApi from '../api/servicesApi';
import {
  deleteState,
  setPublicationsOfUserVisit,
  updateImageProfileAuthor,
  updateUserPublications,
} from '../store/groups/groupSlice';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await servicesApi.loginUser({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('idUser', data.user._id);
      // localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin(data.user));
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || '--'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
    }
  };

  const startRegister = async (user) => {
    dispatch(onChecking());
    try {
      const { data } = await servicesApi.createUser(user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('idUser', data.user._id);

      // localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin(data.user));
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || '--'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
    }
  };

  const updateUser = async (data) => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());
    try {
      const res = await servicesApi.updateUser(data, token, user._id);

      dispatch(onLogin(res.data.user));
      dispatch(updateUserPublications(res.data.user));

      return true;
    } catch (error) {
      dispatch(setError(error.response.data.msg));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
    }
  };

  const setImageProfile = async (image) => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());
    try {
      const { data } = await servicesApi.setImagesUser(
        image,
        token,
        user._id,
        'photo'
      );
      console.log(data);

      dispatch(setImageUserProfile(data.imageProfile));
      const imageProfile = {
        imageProfile: data.imageProfile,
      };
      dispatch(updateImageProfileAuthor(imageProfile));
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const setBannerProfile = async (image) => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());
    try {
      const { data } = await servicesApi.setImagesUser(
        image,
        token,
        user._id,
        'banner'
      );
      console.log(data);
      dispatch(setImageUserBanner(data.imageBanner));
      return true;
    } catch (error) {
      dispatch(setError(error.response.data.msg));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await servicesApi.getDataUser(token);
      // localStorage.setItem('token', data.token);
      // localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin(data.user));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(deleteState());
  };

  const getDataUserVisit = async (idUser) => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await servicesApi.getDataUserVisit(idUser, token);
      dispatch(setUserVisit(data.user));
      dispatch(setPublicationsOfUserVisit(data.publications));
    } catch (error) {
      console.log(error);
    }
  };

  const leaveGroup = async (groupId) => {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('idUser');
    if (!token) return dispatch(onLogout());

    try {
      const resp = await servicesApi.leaveGroup(idUser, token, groupId);
      console.log(resp);
      dispatch(leaveGroupStore(groupId));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    user,

    //* Métodos
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
    updateUser,
    setImageProfile,
    setBannerProfile,
    getDataUserVisit,
    leaveGroup,
  };
};
