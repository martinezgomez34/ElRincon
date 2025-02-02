import React, { useState, useContext } from "react";
import "../Uploadproduct/uploadproduct.css";
import { AuthContext } from "../../../Server/AuthContext"; 
import { useNavigate } from "react-router-dom"; 

const Uploadproduct = () => {
  const [file, setFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState(""); // Nuevo estado para el género
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user, logout } = useContext(AuthContext); // Usa el contexto para obtener el usuario
  const navigate = useNavigate(); // Usa useNavigate para la redirección

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

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (totalAmount < 1 || price < 0.01) {
      setError("Cantidad y precio no pueden ser negativos.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("total_amount", totalAmount);
    formData.append("category_id_fk", categoryId);
    formData.append("size_id_fk", size);
    formData.append("color_id_fk", color);
    formData.append("gender", gender); 
    formData.append("created_by", user ? user.username : "Desconocido");
    formData.append("update_by", user ? user.username : "Desconocido");
    formData.append("deleted", 0); 

    try {
      const response = await fetch("http://localhost:3000/api/product", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user ? user.token : ""}`, // Incluye el token en los encabezados
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response data:", data);

      setSuccessMessage("Producto agregado correctamente");

      setName("");
      setSize("");
      setColor("");
      setTotalAmount("");
      setCategoryId("");
      setPrice("");
      setDescription("");
      setFile(null);
      setUploadedImageUrl("");
      setGender(""); 

      navigate("/HomeAdministration"); 
    } catch (error) {
      console.error("Error al crear el producto:", error.message);
      setError("Error al crear el producto: " + error.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <div className="nav-header">
        <p className="Producto subido">Administrador</p>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      <div className="upload-container">
        <div className="product-form">
          <h1 className="Product">Producto a Subir</h1>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
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
                    <option value="1">S (Chica)</option>
                    <option value="2">M (Mediana)</option>
                    <option value="3">L (Grande)</option>
                    <option value="4">XL (Extra Grande)</option>
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
            <label>Cantidad Producto</label>
            <div className="form-group">
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
              />
            </div>
            <div className="form-group">
             
              <select value={categoryId} onChange={handleCategoryChange}>
                <option value="">Selecciona una categoría</option>
                <option value="1">Blusa</option>
                <option value="2">Saco</option>
                <option value="3">Vestido</option>
                <option value="4">Camisa</option>
              </select>
            </div>
            <div className="form-group">
      
              <select value={gender} onChange={handleGenderChange}>
                <option value="">Selecciona un género</option>
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
            <div className="form-group">
    
              <div className="price">
                <input
                  type="number"
                  placeholder="$0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  step="0.01"
                />
              </div>
            </div>
            <label>Descripción</label>
            <div className="form-group">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <label>Imagen del Producto</label>
            <div className="form-group">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {uploadedImageUrl && (
                <div className="image-preview-container">
                  <img
                    src={uploadedImageUrl}
                    alt="Imagen del Producto"
                    className="image-preview"
                  />
                </div>
              )}
            </div>
            <button className="btn-subir" type="submit">
              Subir Producto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Uploadproduct;
