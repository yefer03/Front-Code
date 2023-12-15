import React, { useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';
import { ModalImage } from '../ModalImage';

export const UserBanner = () => {
  const { user } = useSelector((state) => state.auth);
  const { setBannerProfile } = useAuthStore();

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
        const res = setBannerProfile(formData);
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
    <div className='w-full shadow-2xl relative'>
      <div className='w-full absolute top-0'>
        <div className='flex h-72  overflow-y-hidden w-full '>
          <img
            onClick={() => handleOpenModal(user._id)}
            className='h-full w-full object-scale-down bg-black  rounded-t-lg cursor-pointer '
            src={user.imageBanner}
          />
        </div>
        {openModalPublicationId === user._id && (
          <ModalImage
            showModal={true}
            setShowModal={handleCloseModal}
            file={user.imageBanner}
          />
        )}
      </div>
      <BiImageAdd
        onClick={handleImageUpload}
        className='w-12 h-12 absolute top-3 right-3    text-white cursor-pointer'
      />
    </div>
  );
};
