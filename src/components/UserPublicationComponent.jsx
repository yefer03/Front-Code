import { BsFillEmojiLaughingFill } from 'react-icons/bs';
import { TbHttpDelete } from 'react-icons/tb';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const UserPublicationComponent = ({ fecha, author }) => {
  const navigate = useNavigate();

  const handleUSerVisit = (id) => {
    const myId = localStorage.getItem('idUser');

    if (myId === id) {
      return navigate(`/profile`);
    }

    navigate(`/profile/${id}`);
  };

  return (
    <div className='flex justify-between items-center'>
      <div className='flex space-x-2 items-center'>
        <img
          src={author.imageProfile}
          alt=''
          className='w-12 h-12 rounded-full border-3 object-cover cursor-pointer'
          onClick={() => handleUSerVisit(author._id)}
        />{' '}
        <span className='font-medium text-md capitalize'>
          {author.name} {author.lastName}
        </span>
      </div>
      <div>
        <p className='text-xs text-neutral-400'>{fecha?.slice(0, 10)}</p>
      </div>
    </div>
  );
};
