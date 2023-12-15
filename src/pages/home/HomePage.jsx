import React, { useEffect, useState } from 'react';
import { HomePublication } from '../../components/home/HomePublication';
import { ListGroupUser } from '../../components/groups/ListGroupUser';
import { useGroupsStore } from '../../hooks/useGroupsStore';
import { useDispatch, useSelector } from 'react-redux';
import { addOnePubliactionWithSocket } from '../../store/groups/groupSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

export const HomePage = () => {
  const { socket } = useSelector((state) => state.socket);
  const { newNotification } = useSelector((state) => state.group);
  const dispatch = useDispatch();
  useEffect(() => {
    // Escucha el evento 'nueva-publicacion' y muestra los datos en la consola
    socket.on('nueva-publicacion', (data) => {
      console.log('Nueva publicación recibida:', data);
      dispatch(addOnePubliactionWithSocket(data));
    });

    return () => {
      // Limpia la escucha del evento cuando el componente se desmonta
      socket.off('nueva-publicacion');
    };
  }, [socket]);
  useEffect(() => {
    socket.on('nueva-notificacion', (data) => {
      console.log('Nueva notificacion recibida:', data);
      // dispatch(addOnePubliactionWithSocket(data));
    });

    return () => {
      socket.off('nueva-notificacion');
    };
  }, [socket]);

  return (
    <div className="flex flex-col xl:grid xl:grid-cols-[1fr_4fr] xl:gap-x-5 w-full rounded-lg">
      <div>
        <ListGroupUser />
      </div>
      <div>
        <HomePublication />
      </div>
    </div>
  );
};
// className="flex flex-col xl:grid xl:grid-cols-[1fr_4fr] xl:gap-x-5 w-full rounded-lg"
