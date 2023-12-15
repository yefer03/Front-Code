import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LikeAndCommentComponent } from '../../components/LikeAndCommentComponent';
import { UserPublicationComponent } from '../../components/UserPublicationComponent';
import { AddPublication } from '../../components/groups/AddPublication';
import { useGroupsStore } from '../../hooks/useGroupsStore';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ModalImage } from '../../components/ModalImage';
import {
  addOnePubliactionWithSocketInGroup,
  setPublicationsOfGroupPaginated,
} from '../../store/groups/groupSlice';
import { setUserConnected } from '../../store/socket';
import { ListConnected } from '../../components/groups/ListConnected';
import axios from 'axios';
import { Comentarios } from '../../components/groups/Comentarios';

export const GroupPageContent = () => {
  const { groups, publicationsForGroup } = useSelector((state) => state.group);
  const { getPublicationsOfGroup } = useGroupsStore();

  const [addPublication, setAddPublication] = useState(false);
  const [name, setName] = useState();
  const [openModalPublicationId, setOpenModalPublicationId] = useState(null);

  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  const handleOpenModal = (publicationId) => {
    setOpenModalPublicationId(publicationId);
  };

  const handleCloseModal = () => {
    setOpenModalPublicationId(null);
  };

  const { id } = useParams();
  const token = localStorage.getItem('token');
  // useEffect(() => {
  //   getPublicationsOfGroup(id);
  //   const data = groups.filter((group) => group._id === id);
  //   setName(data[0]);
  // }, []);

  const { publications, totalPages, nameGroup } = publicationsForGroup;

  useEffect(() => {
    // Escucha el evento 'nueva-publicacion' y muestra los datos en la consola

    socket.on('nueva-publicacion', (data) => {
      console.log('Nueva publicación recibida:', data);

      if (data.group === id) {
        // console.log(data);
        dispatch(addOnePubliactionWithSocketInGroup(data));
      }
    });

    return () => {
      // Limpia la escucha del evento cuando el componente se desmonta
      socket.off('nueva-publicacion');
    };
  }, [socket]);

  // const initialPage = parseInt(localStorage.getItem('currentPageGroup')) + 1 || 2;

  const [hasReachedEndSession, setHasReachedEndSession] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initialPage =
    parseInt(localStorage.getItem('currentPageGroup')) + 1 || 2;

  const [page, setPage] = useState(initialPage);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    if (page > totalPages || isFetching) {
      setHasReachedEndSession(true);
      return;
    }

    setIsFetching(true);
    setIsLoading(true);
    setError(null);

    try {
      console.log(page);
      const { data } = await axios.get(
        `http://localhost:8080/publication/one/${id}?page=${page}`,
        {
          headers: {
            token: token,
          },
        },
      );
      dispatch(setPublicationsOfGroupPaginated(data));
      setPage(page + 1);
      localStorage.setItem('currentPageGroup', page);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          fetchData();
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('currentPageGroup');
    });

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, fetchData, isFetching]);

  //
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_3fr] lg:gap-x-2 w-full rounded-lg">
      <div>
        <ListConnected id={id} />
      </div>

      <div className="flex flex-col rounded-lg  ">
        <div className="flex  justify-between  items-center mt-5 ">
          {addPublication ? (
            <div>
              <AddPublication setAddPublication={setAddPublication} />
              <button
                onClick={() => setAddPublication(!addPublication)}
                className="bg-purple-700 text-md rounded-lg px-4 py-2 font-bold hover:bg-purple-900 transition-colors"
              >
                Ocultar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAddPublication(!addPublication)}
              className="bg-purple-700 text-md rounded-lg px-4 py-2 font-bold hover:bg-purple-900 transition-colors"
            >
              Agregar Publicacion
            </button>
          )}

          {addPublication ? (
            ''
          ) : (
            <div className="flex flex-col md:flex-row justify-end items-center space-x-5">
              <p className="font-light">Estas en: </p>
              <h2 className="text-3xl font-semibold">{nameGroup}</h2>
            </div>
          )}
        </div>
        <div className="mt-5">
          <main className="w-full">
            {Array.isArray(publications) ? (
              publications.map(
                (
                  {
                    title,
                    description,
                    _id,
                    file,
                    createdAt,
                    author,
                    code,
                    comments,
                    group,
                    likesUsers,
                  },
                  index,
                ) => (
                  <div key={_id}>
                    <div className="flex flex-col mb-5 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-lg cursor-pointer">
                      <div className="p-3 rounded-lg">
                        <UserPublicationComponent
                          fecha={createdAt}
                          author={author}
                        />
                        <div className="w-full xl-w-11/12 mx-auto mt-5 flex flex-col">
                          <h3 className="text-lg font-semibold mb-5">
                            {title}
                          </h3>

                          <div className="text-sm font-normal rounded-lg mb-2">
                            {description}
                          </div>
                          {code.length > 0 ? (
                            <SyntaxHighlighter
                              language="javascript"
                              style={{
                                ...materialDark,
                                fontSize: '8px',
                                lineHeight: '1.4',
                              }}
                              className="text-sm font-light rounded-lg max-h-96 overflow-y-hidden"
                            >
                              {code}
                            </SyntaxHighlighter>
                          ) : (
                            ''
                          )}
                          <img
                            // onClick={() => handleOpenModal(_id)}
                            className="object-cover rounded-lg mt-2 cursor-pointer"
                            src={file}
                          />
                          {openModalPublicationId === _id && (
                            <ModalImage
                              showModal={true}
                              setShowModal={handleCloseModal}
                              file={file}
                            />
                          )}
                        </div>
                        <LikeAndCommentComponent
                          likes={likesUsers}
                          idPublication={_id}
                          group={group}
                        />
                      </div>
                      <Comentarios
                        comments={comments}
                        publication={_id}
                        group={group}
                      />
                    </div>
                  </div>
                ),
              )
            ) : (
              <p className="text-white text-3xl">
                No hay publicaciones disponibles.
              </p>
            )}
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {hasReachedEndSession && <p>No more data to load.</p>}
          </main>{' '}
          <div ref={observerTarget}></div>
        </div>
      </div>
    </div>
  );
};
