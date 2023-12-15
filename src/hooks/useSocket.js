import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

let socket; // Declarar una variable global para mantener una única instancia de socket

export const useSocket = (serverPath) => {
  const [online, setOnline] = useState(false);

  const token = localStorage.getItem('token');

  // Inicializar o reutilizar la instancia de socket global
  socket = useMemo(() => {
    if (!socket) {
      // Si no hay una instancia de socket existente, crea una nueva
      socket = io.connect(serverPath, {
        transports: ['websocket'],
        query: { token }, // Enviar el token como parte del query
      });
    }
    return socket;
  }, [serverPath, token]);

  useEffect(() => {
    setOnline(socket.connected);

    const handleConnect = () => {
      setOnline(true);
    };

    const handleDisconnect = () => {
      setOnline(false);
    };

    // Agregar y quitar oyentes cuando se monta y desmonta el componente
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      // Limpiar oyentes cuando el componente se desmonta
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, []);

  return {
    socket,
    online,
  };
};
