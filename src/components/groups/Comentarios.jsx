import React, { useEffect, useState } from 'react';
import { useGroupsStore } from '../../hooks/useGroupsStore';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentStore } from '../../store/groups/groupSlice';

export const Comentarios = ({ comments, publication, group }) => {
  const { createRespFather } = useGroupsStore();
  const { socket } = useSelector((state) => state.socket);
  const [responseStates, setResponseStates] = useState({});

  const [commentValues, setCommentValues] = useState('');

  const dispatch = useDispatch();

  const handleToggleResponse = (_id) => {
    setResponseStates((prevState) => ({
      ...prevState,
      [_id]: !prevState[_id],
    }));
  };

  const handleComment = (_id) => {
    const data = {
      text: commentValues,
      parentComment: _id,
      publication,
    };
    createRespFather(data);

    const data2 = {
      idPublication: publication,
      group,
    };
    console.log(data2);
    setTimeout(() => {
      socket.emit('nuevo-comentario', data2);
    }, 5000);

    setCommentValues('');
    setResponseStates((prevState) => ({
      ...prevState,
      [_id]: !prevState[_id],
    }));
  };

  useEffect(() => {
    // Escucha el evento 'nueva-publicacion' y muestra los datos en la consola
    socket.on('nuevo-comentario-publicacion', (data) => {
      console.log('Nueva comentario recibido recibida:', data);

      dispatch(createCommentStore(data.comments));
    });

    return () => {
      // Limpia la escucha del evento cuando el componente se desmonta
      socket.off('nuevo-comentario-publicacion');
    };
  }, [socket]);

  return (
    <div className="bg-neutral-800 rounded-lg flex flex-col items-start w-full">
      {comments.length > 0 && (
        <>
          <div className="h-64 overflow-y-auto w-full p-5">
            {comments.map(({ text, _id, replys, author }) => (
              <div key={_id} className="">
                <div className="bg-purple-700 rounded-lg p-5 text-sm text-white mb-2">
                  <div className=" flex flex-col ">
                    <div className="flex items-center space-x-2">
                      <img
                        src={author.imageProfile}
                        className="w-10 h-10 rounded-full"
                      />
                      <p>
                        {author.name} {author.lastName}
                      </p>
                    </div>
                    <p className="font-semibold mt-2">{text}</p>
                  </div>
                  <div className="flex flex-col items-end ">
                    <button
                      className="font-semibold text-sm"
                      onClick={() => handleToggleResponse(_id)}
                    >
                      Responder
                    </button>
                    {responseStates[_id] ? (
                      <div className="flex flex-col items-end  w-full">
                        <textarea
                          className="w-full bg-neutral-700 p-5 rounded-lg mt-5 resize-none h-28 focus:outline-none focus:ring-0"
                          value={commentValues}
                          onChange={(e) => setCommentValues(e.target.value)}
                        ></textarea>
                        <button
                          onClick={() => handleComment(_id)}
                          className="bg-purple-900 rounded-lg px-4 py-2 text-white font-semibold mt-2"
                        >
                          Crear comentario
                        </button>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>

                {replys.length > 0 && (
                  <div className="ml-5">
                    {replys.map(({ text, _id, replys, author }) => (
                      <div key={_id}>
                        <div className="bg-purple-700/70 rounded-lg p-5 text-sm text-white mb-2 w-full">
                          <div className=" flex flex-col">
                            <div className="flex space-x-2 items-center">
                              <img
                                src={author.imageProfile}
                                className="w-10 h-10 rounded-full"
                              />
                              <p>
                                {author.name} {author.lastName}
                              </p>
                            </div>
                            <p className="font-semibold mt-2">{text} </p>
                          </div>
                          <div className="flex flex-col items-end ">
                            <button
                              className="font-semibold text-sm"
                              onClick={() => handleToggleResponse(_id)}
                            >
                              Responder
                            </button>
                            {responseStates[_id] ? (
                              <div className="flex flex-col items-end  w-full">
                                <textarea
                                  className="w-full bg-neutral-700 p-5 rounded-lg mt-5 resize-none h-28 focus:outline-none focus:ring-0"
                                  value={commentValues}
                                  onChange={(e) =>
                                    setCommentValues(e.target.value)
                                  }
                                ></textarea>
                                <button
                                  onClick={() => handleComment(_id)}
                                  className="bg-purple-900 rounded-lg px-4 py-2 text-white font-semibold mt-2"
                                >
                                  Crear comentario
                                </button>
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                        {replys.length > 0 && (
                          <div className="ml-5">
                            {replys.map(({ text, _id, replys, author }) => (
                              <div key={_id}>
                                <div className="bg-purple-700/50 rounded-lg p-5 text-sm text-white mb-2 w-full">
                                  <div className="flex items-center space-x-2">
                                    <img
                                      src={author.imageProfile}
                                      className="w-10 h-10 rounded-full"
                                      alt=""
                                    />
                                    <p>
                                      {author.name} {author.lastName}
                                    </p>
                                  </div>

                                  <p className="mt-2">{text}</p>
                                </div>
                                {replys.length > 0 && (
                                  <div className="ml-5">
                                    {replys.map(({ text, _id }) => (
                                      <div key={_id}>
                                        <div className="bg-purple-700 rounded-lg p-5 text-sm text-white mb-2 w-full">
                                          <p>{text}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
