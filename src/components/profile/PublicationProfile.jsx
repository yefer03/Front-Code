import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfilePublications } from './ProfilePublications';
import { LikeAndCommentComponent } from '../LikeAndCommentComponent';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AddPublication } from '../groups/AddPublication';
import { ModalImage } from '../ModalImage';
import { useGroupsStore } from '../../hooks/useGroupsStore';
import { Comentarios } from '../groups/Comentarios';

export const PublicationProfile = () => {
  const { myPublications, totalPagesProfile } = useSelector(
    (state) => state.group,
  );

  const { getProfilePublicatios } = useGroupsStore();

  const [openPublicationId, setOpenPublicationId] = useState(null);
  const [publication, setPublication] = useState(null);

  const [openModalPublicationId, setOpenModalPublicationId] = useState(null);

  const [hasReachedEndSession, setHasReachedEndSession] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initialPage =
    parseInt(localStorage.getItem('currentPageProfile')) + 1 || 2;
  const [page, setPage] = useState(initialPage);
  const [isFetching, setIsFetching] = useState(false);

  const lastPublicationRef = useRef();

  const handleOpenModal = (publicationId) => {
    setOpenModalPublicationId(publicationId);
  };

  const handleCloseModal = () => {
    setOpenModalPublicationId(null);
  };

  const handleTogglePublication = (id) => {
    if (openPublicationId === id) {
      setOpenPublicationId(null);
    } else {
      setOpenPublicationId(id);
      const data = myPublications.find((publication) => publication._id === id);
      setPublication(data);
    }
  };

  const fetchData = async () => {
    if (page > totalPagesProfile || isFetching) {
      setHasReachedEndSession(true);
      return;
    }

    setIsFetching(true);
    setIsLoading(true);
    setError(null);

    try {
      console.log(page);
      await getProfilePublicatios(page);
      setPage(page + 1);
      if (page === 1) setPage(2);
      localStorage.setItem('currentPageProfile', page);
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
      localStorage.removeItem('currentPageProfile');
    });

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, fetchData, isFetching]);

  return (
    <div>
      <main className="mt-5 ">
        {Array.isArray(myPublications) ? (
          myPublications.map(
            ({
              title,
              description,
              _id,
              file,
              createdAt,
              code,
              comments,
              group,
              likesUsers,
            }) => (
              <div
                className="flex flex-col mb-5 bg-neutral-800 hover:bg-neutral-700 transition-colors  rounded-lg cursor-pointer"
                key={_id}
              >
                <div className="p-3 rounded-lg ">
                  <ProfilePublications fecha={createdAt} id={_id} view={true} />
                  <div className="flex justify-end">
                    {openPublicationId === _id ? (
                      <button
                        onClick={() => handleTogglePublication(_id)}
                        className="text-purple-700 font-black"
                      >
                        Ocultar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleTogglePublication(_id)}
                        className="text-purple-700 font-black"
                      >
                        UPDATE
                      </button>
                    )}
                  </div>
                  <div className="w-full xl:w-11/12 mx-auto mt-5 flex flex-col">
                    <h3 className="text-lg font-semibold mb-5">{title}</h3>

                    <div className="text-sm font-normal rounded-lg mb-2">
                      {description}
                    </div>

                    {code.length > 0 ? (
                      <SyntaxHighlighter
                        language="javascript" // Cambia 'javascript' al lenguaje adecuado
                        style={materialDark}
                        className="text-md font-light rounded-lg max-h-96 overflow-y-hidden"
                      >
                        {code}
                      </SyntaxHighlighter>
                    ) : (
                      ''
                    )}
                    <img
                      onClick={() => handleOpenModal(_id)}
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
                    idPublication={_id}
                    group={group}
                    likes={likesUsers}
                  />
                </div>
                <Comentarios
                  comments={comments}
                  publication={_id}
                  group={group}
                />
                <div className="bg-purple-900/25">
                  {openPublicationId === _id && (
                    <AddPublication
                      publication={publication}
                      setOpenPublicationId={setOpenPublicationId}
                    />
                  )}
                </div>
              </div>
            ),
          )
        ) : (
          <p>No hay publicaciones disponibles.</p>
        )}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {hasReachedEndSession && <p>No more data to load.</p>}
      </main>
      <div ref={observerTarget}></div>
    </div>
  );
};
