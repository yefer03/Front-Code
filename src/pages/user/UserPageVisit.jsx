import React, { useEffect, useState } from 'react';
import { ImLocation2 } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';
import { AiFillPhone } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useParams } from 'react-router-dom';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { LikeAndCommentComponent } from '../../components/LikeAndCommentComponent';
import { ModalImage } from '../../components/ModalImage';
import { Comentarios } from '../../components/groups/Comentarios';

export const UserPageVisit = () => {
  const { userVisit } = useSelector((state) => state.auth);
  const { publicationsUserVisit } = useSelector((state) => state.group);

  const { getDataUserVisit } = useAuthStore();

  const [openModalPublicationIds, setOpenModalPublicationIds] = useState({});

  const handleOpenModal = (publicationId, imageType) => {
    setOpenModalPublicationIds({
      ...openModalPublicationIds,
      [imageType]: publicationId,
    });
  };

  const handleCloseModal = () => {
    setOpenModalPublicationIds({});
  };

  const { id } = useParams();

  useEffect(() => {
    getDataUserVisit(id);
  }, []);

  return (
    <>
      <header className="w-full bg-neutral-800  rounded-lg hover:bg-purple-900/30 transition-colors">
        <div className=" w-full h-72 relative  ">
          <div className="w-full shadow-2xl relative">
            <div className="w-full absolute top-0">
              <img
                onClick={() => handleOpenModal(userVisit._id, 'imageBanner')}
                className="h-72 w-full object-cover  rounded-t-lg cursor-pointer "
                src={userVisit.imageBanner}
              />
              {openModalPublicationIds.imageBanner === userVisit._id && (
                <ModalImage
                  showModal={true}
                  setShowModal={handleCloseModal}
                  file={userVisit.imageBanner}
                />
              )}
            </div>
          </div>
          <div className="w-48 h-48 absolute top-64 left-28 transform -translate-x-1/2 -translate-y-1/2">
            <img
              onClick={() => handleOpenModal(userVisit._id, 'imageProfile')}
              src={userVisit.imageProfile}
              alt="IMG-0063-3"
              className="rounded-full object-cover aspect-square border-8 cursor-pointer  border-neutral-500"
            />
            {openModalPublicationIds.imageProfile === userVisit._id && (
              <ModalImage
                showModal={true}
                setShowModal={handleCloseModal}
                file={userVisit.imageProfile}
              />
            )}
          </div>
        </div>

        <div className="  rounded-lg mt-20">
          <div className=" p-3 rounded-lg ">
            <div className="w-full xl:w-11/12 mx-auto ">
              <h3 className="text-xl font-semibold capitalize">
                {userVisit.name} {userVisit.lastName}
              </h3>

              <div className="flex items-center mt-5 space-x-2">
                <p className="text-s font-light ">{userVisit.description}</p>
              </div>
              <div className="mt-5 ">
                <ul className="flex  flex-col lg:flex-row justify-between space-y-5 lg:space-y-0 lg:items-center">
                  <li className="flex items-center font-light ">
                    {' '}
                    <ImLocation2 className="w-6 h-6 mr-2   text-neutral-400" />
                    {userVisit.country}
                  </li>
                  <li className="flex items-center font-light">
                    <MdEmail className="w-6 h-6 mr-2 text-neutral-400" />
                    {userVisit.email}
                  </li>
                  <li className="flex items-center font-light">
                    <AiFillPhone className="w-6 h-6 mr-2 text-neutral-400" />
                    {userVisit.phoneNumber}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mt-5 ">
        {Array.isArray(publicationsUserVisit) ? (
          publicationsUserVisit.map(
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
                className="flex flex-col mb-5 bg-neutral-800 hover:bg-neutral-700 transition-colors  rounded-lg   "
                key={_id}
              >
                <div className="p-3 rounded-lg ">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2 items-center">
                      <img
                        src={userVisit.imageProfile}
                        alt=""
                        className="w-12 h-12 rounded-full border-3 object-cover"
                      />

                      <span className="font-medium text-md capitalize">
                        {userVisit.name} {userVisit.lastName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-5">
                      <p className="text-xs text-neutral-400">
                        {createdAt?.slice(0, 10)}
                      </p>
                    </div>
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
                      onClick={() => handleOpenModal(_id, 'publication')}
                      className="object-cover cursor-pointer  rounded-lg mt-2"
                      src={file}
                    />
                    {openModalPublicationIds.publication === _id && (
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
          <p>No hay publicaciones disponibles.</p>
        )}
      </main>
    </>
  );
};
