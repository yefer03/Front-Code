import React, { useState } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { FaPenToSquare } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

export const AddDescription = () => {
  const { user } = useSelector((state) => state.auth);

  const { updateUser, errorMessage } = useAuthStore();

  const [see, setSee] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    const res = updateUser(data);

    if (res) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se a actualizado correctamente',
        showConfirmButton: false,
        timer: 3000,
      });
      setSee(!see);
    }
  });
  return (
    <div>
      <div className='flex items-center mt-5 space-x-2'>
        <p className='text-md font-light '>{user.description}</p>
        <FaPenToSquare
          className='w-5 h-5 cursor-pointer'
          onClick={() => setSee(!see)}
        />
      </div>
      {see ? (
        <form onSubmit={onSubmit} className='flex flex-col'>
          <div>
            <textarea
              {...register('description')}
              className='resize-none rounded-md bg-neutral-900/50 p-5 mt-4 w-full'
              placeholder='Escribe una descripcion'
            ></textarea>
          </div>
          <div>
            <button
              type='submit'
              className='bg-purple-700 text-white text-sm font-black px-5 py-3 rounded-lg  hover:bg-purple-950 transition-colors duration-300 items-end'
            >
              Guardar
            </button>
          </div>
        </form>
      ) : (
        ''
      )}
    </div>
  );
};
