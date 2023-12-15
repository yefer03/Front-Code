import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TbPointFilled } from 'react-icons/tb';
import { setUserConnected } from '../../store/socket';

export const ListConnected = ({ id }) => {
  const { usersConnected } = useSelector((state) => state.socket);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit('obtener-sockets-en-sala', { group: id }, (response) => {
      console.log(response.sockets);
      dispatch(setUserConnected(response.sockets));
    });

    return () => {
      socket.off('obtener-sockets-en-sala');
    };
  }, [id]);

  useEffect(() => {
    socket.on('lista-de-sockets-en-sala', (sockets) => {
      console.log('Sockets en la sala ACTUALIZADO', sockets);
      dispatch(setUserConnected(sockets));
    });

    return () => {
      socket.off('lista-de-sockets-en-sala');
    };
  }, [socket]);

  return (
    <div className="max-h-96   xl:mt-20 overflow-y-auto  bg-neutral-800  hover:bg-neutral-700 transition-colors  rounded-lg">
      {usersConnected?.map(({ name, lastName, imageProfile }) => (
        <div key={name} className="flex items-center justify-start p-3 ">
          <img src={imageProfile} className="rounded-full w-8 h-8 mr-4" />
          <p className="font-semibold text-sm flex items-center ">
            {name} {lastName}{' '}
            <TbPointFilled className="text-green-600 h-6 w-6" />
          </p>
        </div>
      ))}
    </div>
  );
};
