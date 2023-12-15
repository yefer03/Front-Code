import React from 'react';
import { useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import { useGroupsStore } from '../../hooks/useGroupsStore';

export const ListGroupUser = () => {
  const { groups, groupActive } = useSelector((state) => state.group);
  const { user } = useSelector((state) => state.auth);
  const { getPublicationsOfGroup } = useGroupsStore();

  const navigate = useNavigate();
  // const redirectGroups = (id) => {
  //   navigate(`group/${id}`);
  // };

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
      {groups.map(({ _id, name }) => (
        <div
          key={_id} // Agregamos la clave única
          className={`rounded-lg p-5 flex flex-col justify-center cursor-pointer mb-4  bg-neutral-800 hover:bg-purple-900/30 transition-colors ${
            user.groups?.includes(_id) ? '' : 'hidden' // Ocultamos elementos que no cumplan la condición
          }`}
          onClick={() => verGrupo(_id)}
        >
          <p> {name}</p>
        </div>
      ))}
    </div>
  );
};
