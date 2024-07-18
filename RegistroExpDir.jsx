import React, { useState } from 'react';
import Modal from './modal'; // Asegúrate de importar el componente Modal desde el archivo correcto

const RegistroExpediente = ({ onSubmit }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  return (
    <div>
      <button onClick={handleOpenModal}>Registrar Expediente</button>
      
      {/* Agregar el componente Modal aquí */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={onSubmit} />
    </div>
  );
};

export default RegistroExpediente;
