// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Header from "../../../Components/Organismos/Header/Header";
import Button from "../../../Components/Atomos/Button/Button";
import "../Uploadproduct/uploadproduct.css";

const Uploadproduct = () => {
  const [file, setFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const username = "Cerrar Sesión";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadedImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value === "null" ? null : e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', file);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('total_amount', totalAmount);
    formData.append('category_id_fk', categoryId);
    formData.append('size_id_fk', size);
    formData.append('color_id_fk', color);
    formData.append('created_by', username);
    formData.append('update_by', username);
    formData.append('deleted', 0); // Cambiado a 0

    try {
      const response = await fetch('http://localhost:3000/api/product', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response data:', data);

      setSuccessMessage('Producto agregado correctamente');

      // Clear form after successful submission
      setName('');
      setSize('');
      setColor('');
      setTotalAmount('');
      setCategoryId('');
      setPrice('');
      setDescription('');
      setFile(null);
      setUploadedImageUrl('');
    } catch (error) {
      console.error('Error al crear el producto:', error.message);
      setError('Error al crear el producto: ' + error.message);
    }
  };

  return (
    <div>
      <Header userName={username} />

      <div className="upload-container">
        <div className="product-form">
          <h1 className="Product">Producto a Subir</h1>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label>Nombre del Producto</label>
    <input
      type="text"
      value={name}
      onChange={handleNameChange}
      placeholder="Nombre del producto"
    />
  </div>

  <div className="form-group">
    <div className="form-row">
      <div className="form-col">
        <select value={size} onChange={handleSizeChange}>
          <option value="">Selecciona una talla</option>
          <option value="1">S (Chica) 7cm</option>
          <option value="2">M (Mediana) 9cm</option>
          <option value="3">L (Grande) 11cm</option>
          <option value="4">XL (Extra Grande) 13cm</option>
        </select>
      </div>

      <div className="form-col">
        <select value={color} onChange={handleColorChange}>
          <option value="">Selecciona un color</option>
          <option value="999">Ninguno</option>
          <option value="1">Rojo</option>
          <option value="2">Azul</option>
          <option value="3">Amarillo</option>
          <option value="4">Verde</option>
          <option value="5">Negro</option>
          <option value="6">Blanco</option>
          <option value="7">Naranja</option>
          <option value="8">Morado</option>
          <option value="9">Rosa</option>
          <option value="10">Gris</option>
        </select>
      </div>
    </div>
  </div>

  <div className="form-group">
    <label>Cantidad Producto</label>
    <input
      type="number"
      value={totalAmount}
      onChange={(e) => setTotalAmount(e.target.value)}
    />
  </div>
  <div className="form-group">
    <label>Categoría</label>
    <input
      type="text"
      value={categoryId}
      onChange={(e) => setCategoryId(e.target.value)}
    />
  </div>
  <div className="form-group">
    <label>Precio</label>
    <div className="price">
      <input
        type="number"
        placeholder="$0.00"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
    </div>
  </div>
  <div className="form-group">
    <label>Descripción</label>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </div>
  <div className="form-group">
    <label>Imagen del Producto</label>
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
    />
    {uploadedImageUrl && (
      <div className="image-preview-container">
        <img src={uploadedImageUrl} alt="Imagen del Producto" className="image-preview" />
      </div>
    )}
  </div>
  <button className="btn-subir" type="submit">Subir Producto</button>
</form>

        </div>

        {uploadedImageUrl && (
          <div className="image-preview-container">
            <img src={uploadedImageUrl} alt="Vista previa" className="image-preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploadproduct;
