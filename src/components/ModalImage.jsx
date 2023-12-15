import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo más transparente (ajusta el valor alpha)
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%', // Tamaño máximo del modal
    maxHeight: '90vh', // Altura máxima del modal (90% de la altura de la ventana)
    border: 'none', // Elimina el borde del contenido
    padding: '0', // Sin relleno en el contenido
    overflow: 'hidden', //
  },
};

Modal.setAppElement('#root'); // Debes establecer el elemento raíz de tu aplicación

export const ModalImage = ({ showModal, setShowModal, file }) => {
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Modal Image'
    >
      <div className='relative'>
        <button
          onClick={closeModal}
          className='absolute top-2 right-2 text-white bg-purple-700 rounded-lg p-2 hover:bg-purple-800 z-10'
        >
          Cerrar
        </button>
        <div className='flex'>
          <img
            src={file}
            alt='Imagen'
            className='w-full  md:object-fill md:w-full max-w-3xl '
          />
        </div>
      </div>
    </Modal>
  );
};
