import React from 'react';
import './InfoPage.css';

const InfoPage = () => {
  const business = {
    name: "El rincón de los textiles",
    description: "Prendas hechas a mano el telar de pedal alta costura",
    address: "Diego de Mazariegos 29",
    phone: "967 178 7180",
    email: "kbobi761@gmail.com",
    category: "Diseñador",
    status: "Siempre abierto"
  };

  return (
    <div className="info-container">
      <h1 className="info-name">{business.name}</h1>
      <p className="info-description">{business.description}</p>
      <div className="info-section">
        <h2>Información de contacto</h2>
        <p><strong>Dirección:</strong> {business.address}</p>
        <p><strong>Teléfono:</strong> {business.phone}</p>
        <p><strong>Correo electrónico:</strong> <a href={`mailto:${business.email}`}>{business.email}</a></p>
      </div>
      <div className="info-section">
        <h2>Categoría</h2>
        <p>{business.category}</p>
      </div>
      <div className="info-section">
        <h2>Estado</h2>
        <p>{business.status}</p>
      </div>
    </div>
  );
}

export default InfoPage;
