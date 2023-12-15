import React, { useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { ModalImage } from '../ModalImage';

export const UserImage = () => {
  const { user } = useSelector((state) => state.auth);
  const { setImageProfile } = useAuthStore();

  const [openModalPublicationId, setOpenModalPublicationId] = useState(null);

  const handleOpenModal = (publicationId) => {
    setOpenModalPublicationId(publicationId);
  };

  const handleCloseModal = () => {
    setOpenModalPublicationId(null);
  };

  const handleImageUpload = () => {
    // Crear un objeto FormData
    const formData = new FormData();

    // Abrir el cuadro de diálogo para seleccionar una imagen
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg, .jpeg, .png, .gif, .webp, .avif'; // Limitar a las extensiones deseadas

    input.onchange = (e) => {
      const selectedImage = e.target.files[0];

      if (selectedImage) {
        // Agregar el archivo seleccionado al objeto FormData
        formData.append('file', selectedImage);

        // Aquí puedes realizar alguna lógica adicional si es necesario,
        // como cargar la imagen al servidor o mostrarla en la interfaz.
        // Por ahora, simplemente puedes imprimir el objeto FormData.
        const res = setImageProfile(formData);
        if (res) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se a actualizado correctamente',
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }
    };

    input.click();
  };

  return (
    <div className='w-48 h-48 absolute top-64 left-28 transform -translate-x-1/2 -translate-y-1/2'>
      <img
        onClick={() => handleOpenModal(user._id)}
        src={user.imageProfile}
        alt='IMG-0063-3'
        className='rounded-full object-cover  bg-black cursor-pointer aspect-square border-8 border-neutral-500'
      />
      {openModalPublicationId === user._id && (
        <ModalImage
          showModal={true}
          setShowModal={handleCloseModal}
          file={user.imageProfile}
        />
      )}
      <AiFillCamera
        onClick={handleImageUpload}
        className='w-12 h-12 absolute top-36 right-5 text-white cursor-pointer'
      />
    </div>
  );
};
