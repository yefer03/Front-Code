import { createSlice } from '@reduxjs/toolkit';

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groups: [],
    publications: [],
    publicationsForGroup: [],
    myPublications: [],
    publicationsUserVisit: [],
    errorMessage: '',
    totalPages: 0,
    totalPagesOfGroup: 0,
    totalPagesProfile: 0,
    groupActive: null,
    notifications: [],
    newNotification: false,
  },
  reducers: {
    deleteState: (state, { payload }) => {
      state.groups = [];
      state.publications = [];
      state.publicationsForGroup = [];
      state.myPublications = [];
      state.errorMessage = '';
    },

    setError: (state, { payload }) => {
      state.errorMessage = payload;
    },

    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
    setGroupsInStore: (state, { payload }) => {
      state.groups = payload;
      state.errorMessage = undefined;
    },

    setMyPublicationsStore: (state, { payload }) => {
      console.log(payload);
      state.myPublications = state.myPublications.concat(payload);
    },
    setPagesProfile: (state, { payload }) => {
      state.totalPagesProfile = payload;
    },

    setPublicationsOfGroup: (state, { payload }) => {
      state.groupActive = payload.groupId;

      if (state.groupActive === payload.groupId) {
        state.publicationsForGroup = payload;
      } else {
        state.publicationsForGroup = [];
        state.publicationsForGroup = payload;
      }
    },

    setPublicationsOfGroupPaginated: (state, { payload }) => {
      console.log(payload);
      state.publicationsForGroup.publications =
        state.publicationsForGroup.publications.concat(payload.publications);
    },

    seAllPublications: (state, { payload }) => {
      state.publications = state.publications.concat(payload.publicaciones);
      state.totalPages = payload.totalPages;
    },

    // seAllPublicationsPaginated: (state, { payload }) => {
    //   let newState = [...state.publications, payload];
    //   state.publications = newState;
    // },
    addPublicationToState: (state, { payload }) => {
      let newState = [payload, ...state.publicationsForGroup.publications];
      state.publicationsForGroup.publications = newState;

      let newState2 = [payload, ...state.publications];
      state.publications = newState2;

      let newState3 = [payload, ...state.myPublications];
      state.myPublications = newState3;
    },

    updateUserPublications: (state, { payload }) => {
      const id = localStorage.getItem('idUser');

      state.publications = state.publications.map((publication) => {
        const updatedAuthor = { ...publication.author };
        if (updatedAuthor._id === id) {
          updatedAuthor.name = payload.name;
          updatedAuthor.lastName = payload.lastName;
        }

        return {
          ...publication,
          author: updatedAuthor,
        };
      });
    },
    updateImageProfileAuthor: (state, { payload }) => {
      const id = localStorage.getItem('idUser');
      state.publications = state.publications.map((publication) => {
        const updatedAuthor = { ...publication.author };

        if (updatedAuthor._id === id) {
          updatedAuthor.imageProfile = payload.imageProfile;
        }

        return {
          ...publication,
          author: updatedAuthor,
        };
      });
    },

    deletePublicationStore: (state, { payload }) => {
      let newData = state.myPublications.filter(
        (publication) => publication._id !== payload,
      );
      state.myPublications = newData;

      let newData2 = state.publications.filter(
        (publication) => publication._id !== payload,
      );
      state.publications = newData2;

      // let newData3 = state.publicationsForGroup.filter(
      //   (publication) => publication._id !== payload
      // );
      // state.publicationsForGroup = newData3;
    },

    setPublicationsOfUserVisit: (state, { payload }) => {
      state.publicationsUserVisit = [];
      state.publicationsUserVisit = payload;
    },

    updatePublicationStore: (state, { payload }) => {
      const updatedPublication = payload;

      const publicationIndex = state.publications.findIndex(
        (publication) => publication._id === updatedPublication._id,
      );

      const myPublicationIndex = state.myPublications.findIndex(
        (publication) => publication._id === updatedPublication._id,
      );

      if (publicationIndex !== -1) {
        state.publications[publicationIndex] = updatedPublication;
      }

      if (myPublicationIndex !== -1) {
        state.myPublications[myPublicationIndex] = updatedPublication;
      }
    },
    addOnePubliactionWithSocket: (state, { payload }) => {
      let newState2 = [payload, ...state.publications];
      state.publications = newState2;
    },
    addOnePubliactionWithSocketInGroup: (state, { payload }) => {
      const publicationExists = state.publicationsForGroup.publications.some(
        (pub) => pub._id === payload._id,
      );
      // console.log(publicationExists);

      if (!publicationExists) {
        // Si la publicación no existe, agrégala al estado
        let newState = [payload, ...state.publicationsForGroup.publications];
        state.publicationsForGroup.publications = newState;
      }
    },
    createCommentStore: (state, { payload }) => {
      console.log(payload);
      const publicationId = payload[0].publication;

      const publicationIndex = state.publications.findIndex(
        (publication) => publication._id === publicationId,
      );

      if (publicationIndex !== -1) {
        // Clona la publicación y actualiza la propiedad 'comments'
        const updatedPublication = {
          ...state.publications[publicationIndex],
          comments: payload,
        };

        // Reemplaza la publicación en el array con la versión actualizada
        state.publications[publicationIndex] = updatedPublication;
      }

      // profile

      const publicationIndexProfile = state.myPublications.findIndex(
        (publication) => publication._id === publicationId,
      );

      if (publicationIndexProfile !== -1) {
        // Clona la publicación y actualiza la propiedad 'comments'
        const updatedPublicationProfile = {
          ...state.myPublications[publicationIndexProfile],
          comments: payload,
        };

        // Reemplaza la publicación en el array con la versión actualizada
        state.myPublications[publicationIndexProfile] =
          updatedPublicationProfile;
      }

      // grupos

      if (state.publicationsForGroup.publications) {
        const publicationIndexGroup =
          state.publicationsForGroup.publications.findIndex(
            (publication) => publication._id === publicationId,
          );

        if (publicationIndexGroup !== -1) {
          // Clona la publicación y actualiza la propiedad 'comments'
          const updatedPublicationGroup = {
            ...state.publicationsForGroup.publications[publicationIndexGroup],
            comments: payload,
          };

          // Reemplaza la publicación en el array con la versión actualizada
          state.publicationsForGroup.publications[publicationIndexGroup] =
            updatedPublicationGroup;
        }
      }

      if (state.publicationsUserVisit) {
        const publicationIndexUserVisit = state.publicationsUserVisit.findIndex(
          (publication) => publication._id === publicationId,
        );

        if (publicationIndexUserVisit !== -1) {
          // Clona la publicación y actualiza la propiedad 'comments'
          const updatedPublicationUserVisit = {
            ...state.publicationsUserVisit[publicationIndexUserVisit],
            comments: payload,
          };

          // Reemplaza la publicación en el array con la versión actualizada
          state.publicationsUserVisit[publicationIndexUserVisit] =
            updatedPublicationUserVisit;
        }
      }
    },
    setNotificationsStore(state, { payload }) {
      state.notifications = payload;
    },
    setNewNotificationsStore(state, { payload }) {},
    createLikeStore(state, { payload }) {
      // console.log(payload.idPublication);

      const publicationId = payload.idPublication;
      const publicationIndex = state.publications.findIndex(
        (publication) => publication._id === publicationId,
      );

      if (publicationIndex !== -1) {
        // Clona la publicación y actualiza la propiedad 'comments'
        const updatedPublication = {
          ...state.publications[publicationIndex],
          likesUsers: payload.likes,
        };

        // Reemplaza la publicación en el array con la versión actualizada
        state.publications[publicationIndex] = updatedPublication;
      }
      // profile

      const publicationIndexProfile = state.myPublications.findIndex(
        (publication) => publication._id === publicationId,
      );

      if (publicationIndexProfile !== -1) {
        // Clona la publicación y actualiza la propiedad 'comments'
        const updatedPublicationProfile = {
          ...state.myPublications[publicationIndexProfile],
          likesUsers: payload.likes,
        };

        // Reemplaza la publicación en el array con la versión actualizada
        state.myPublications[publicationIndexProfile] =
          updatedPublicationProfile;
      }

      // grupos

      if (state.publicationsForGroup.publications) {
        const publicationIndexGroup =
          state.publicationsForGroup.publications.findIndex(
            (publication) => publication._id === publicationId,
          );

        if (publicationIndexGroup !== -1) {
          // Clona la publicación y actualiza la propiedad 'comments'
          const updatedPublicationGroup = {
            ...state.publicationsForGroup.publications[publicationIndexGroup],
            likesUsers: payload.likes,
          };

          // Reemplaza la publicación en el array con la versión actualizada
          state.publicationsForGroup.publications[publicationIndexGroup] =
            updatedPublicationGroup;
        }
      }

      if (state.publicationsUserVisit) {
        const publicationIndexUserVisit = state.publicationsUserVisit.findIndex(
          (publication) => publication._id === publicationId,
        );

        if (publicationIndexUserVisit !== -1) {
          // Clona la publicación y actualiza la propiedad 'comments'
          const updatedPublicationUserVisit = {
            ...state.publicationsUserVisit[publicationIndexUserVisit],
            likesUsers: payload.likes,
          };

          // Reemplaza la publicación en el array con la versión actualizada
          state.publicationsUserVisit[publicationIndexUserVisit] =
            updatedPublicationUserVisit;
        }
      }
    },
  },
});

export const {
  deleteState,
  setError,
  clearErrorMessage,
  setGroupsInStore,
  seAllPublications,
  setMyPublicationsStore,
  updateUserPublications,
  updateImageProfileAuthor,
  setPublicationsOfGroup,
  addPublicationToState,
  deletePublicationStore,
  setPublicationsOfUserVisit,
  updatePublicationStore,
  addOnePubliactionWithSocket,
  addOnePubliactionWithSocketInGroup,
  setPublicationsOfGroupPaginated,
  setPagesProfile,
  createCommentStore,
  createLikeStore,
  setNotificationsStore,
} = groupSlice.actions;
