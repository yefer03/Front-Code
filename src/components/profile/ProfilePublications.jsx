import { TbHttpDelete } from 'react-icons/tb';
import React from 'react';
import { useSelector } from 'react-redux';
import { useGroupsStore } from '../../hooks/useGroupsStore';
import Swal from 'sweetalert2';

export const ProfilePublications = ({ fecha, id }) => {
  const { user } = useSelector((state) => state.auth);
  const { deletePublication } = useGroupsStore();

  const handleDeletePublication = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro que deseas eliminar la publiacion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, quiero!',
    });

    if (isConfirmed) {
      deletePublication(id);
    }
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-2 items-center">
        <img
          src={user.imageProfile}
          alt=""
          className="w-12 h-12 rounded-full border-3 object-cover"
        />{' '}
        <span className="font-medium text-md capitalize">
          {user.name} {user.lastName}
        </span>
      </div>
      <div className="flex items-center space-x-5">
        <div className="flex space-x-2">
          <button onClick={() => handleDeletePublication(id)}>
            <TbHttpDelete className="w-8 h-8  text-red-700 hover:text-red-900 transition-colors" />
          </button>
        </div>
        <p className="text-xs text-neutral-400">{fecha?.slice(0, 10)}</p>
      </div>
    </div>
  );
};
