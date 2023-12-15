import React from 'react';
import { groups } from '../../api/dataExample';
import { useSelector } from 'react-redux';
import { useGroupsStore } from '../../hooks/useGroupsStore';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Backend = ({ backGroups }) => {
  const { joinGroup, getAllPublications, getPublicationsOfGroup } =
    useGroupsStore();
  const { leaveGroup } = useAuthStore();
  const { groupActive } = useSelector((state) => state.group);

  const { user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);

  const navigate = useNavigate();
  const leaveOfGroup = async (groupId, groupName) => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Tu saldras del grupo ${groupName}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, quiero salir!',
    });
    if (isConfirmed) leaveGroup(groupId);
  };

  const joinGroupWithSocket = async (groupId) => {
    // Emitir el evento de socket 'unir-socket-grupo' y enviar el ID del grupo
    socket.emit('unir-socket-grupo', { group: groupId });

    // Luego, realizar la acción de unirse al grupo y obtener las publicaciones
    if (joinGroup(groupId)) {
      navigate(`/group/${groupId}`);
      getAllPublications();
    }
  };

  const verGrupo = async (id) => {
    if (groupActive !== id) {
      localStorage.removeItem('currentPageGroup');
      getPublicationsOfGroup(id);
      navigate(`/group/${id}`);
    }
    navigate(`/group/${id}`);
  };

  return (
    <div>
      <div className='w-full '>
        {backGroups.map((group) => (
          <div
            className='flex justify-between items-center  p-5  hover:bg-neutral-700 transition-all duration-200'
            key={group._id}
          >
            <h4 className='text-sm font-semibold'> {group.name}</h4>
            {user.groups?.includes(group._id) ? (
              <div className='flex gap-2'>
                <button
                  className='bg-[#38184C] px-4 py-2  uppercase rounded-lg text-sm hover:bg-red-900 transition-colors ease-out'
                  onClick={() => leaveOfGroup(group._id, group.name)}
                >
                  Salir
                </button>
                <button
                  onClick={() => {
                    verGrupo(group._id);
                  }}
                  className='bg-[#A0CD60] text-[#38184C] px-4 py-2  uppercase rounded-lg text-sm hover:bg-purple-900 transition-colors ease-out'
                >
                  Ver Grupo
                </button>
              </div>
            ) : (
              <button
                onClick={() => joinGroupWithSocket(group._id)} // Llama a la función modificada
                className='bg-purple-800 px-4 py-2 uppercase rounded-lg text-sm hover:bg-purple-900 transition-colors ease-out'
              >
                Unirme
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
