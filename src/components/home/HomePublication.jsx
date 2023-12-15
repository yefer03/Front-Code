import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useGroupsStore } from '../../hooks/useGroupsStore';

import { UserPublicationComponent } from '../UserPublicationComponent';
import { LikeAndCommentComponent } from '../LikeAndCommentComponent';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ModalImage } from '../ModalImage';
import { Comentarios } from '../groups/Comentarios';

export const HomePublication = () => {
  const { publications, totalPages } = useSelector((state) => state.group);
  const { getAllPublications } = useGroupsStore();

  const [openModalPublicationId, setOpenModalPublicationId] = useState(null);
  const [hasReachedEndSession, setHasReachedEndSession] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initialPage = parseInt(localStorage.getItem('currentPage')) + 1 || 2;
  const [page, setPage] = useState(initialPage);
  const [isFetching, setIsFetching] = useState(false);

  const lastPublicationRef = useRef();

  const handleOpenModal = (publicationId) => {
    setOpenModalPublicationId(publicationId);
  };

  const handleCloseModal = () => {
    setOpenModalPublicationId(null);
  };

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
      await getAllPublications(page); // Realiza la solicitud al backend
      setPage(page + 1);
      if (page === 1) setPage(2);
      localStorage.setItem('currentPage', page);
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
      localStorage.removeItem('currentPage');
    });

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, fetchData, isFetching]);

  return (
    <div>
      <main className="w-full">
        {Array.isArray(publications) && publications.length > 0 ? (
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
              <div
                className="flex flex-col mb-5 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-lg cursor-pointer"
                key={_id}
              >
                <div className="p-3 rounded-lg">
                  <UserPublicationComponent fecha={createdAt} author={author} />
                  <div className="w-full xl-w-11/12 mx-auto mt-5 flex flex-col">
                    <h3 className="text-lg font-semibold mb-5">{title}</h3>

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
                        classNzame="text-sm font-light rounded-lg max-h-96 overflow-y-hidden"
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
      </main>
      <div ref={observerTarget}></div>
    </div>
  );
};
