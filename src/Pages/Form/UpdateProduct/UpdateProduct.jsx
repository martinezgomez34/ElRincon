import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Server/AuthContext'; // Ajusta la ruta según tu estructura de carpetas
import "../UpdateProduct/UpdateProduct.css";
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const [file, setFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Cambiado a categoryId
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState(""); // Nuevo estado para género
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [productIdToEdit, setProductIdToEdit] = useState("");
  const { user } = useContext(AuthContext); // Obtén el usuario del contexto
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.rol_id_fk !== 2) {
      navigate('/FormLogin');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) {
        console.error("Usuario no autenticado");
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/product', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, [user]);

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

  const handleGenderChange = (e) => {
    setGender(e.target.value); // Maneja el cambio de género
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value); // Cambiado a setCategoryId
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!productIdToEdit) {
      setError("Por favor, ingresa el ID del producto a modificar.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', file);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('total_amount', totalAmount);
    formData.append('category_id_fk', categoryId); // Añade la categoría al formulario
    formData.append('size_id_fk', size);
    formData.append('color_id_fk', color);
    formData.append('gender', gender); // Añade el género a los datos del formulario
    formData.append('update_by', user.first_name); // Usa el nombre del usuario desde el contexto
    formData.append('deleted', 0);

    try {
      const response = await fetch(`http://localhost:3000/api/product/${productIdToEdit}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${user.token}` // Incluye el token en los encabezados
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response data:', data);

      setSuccessMessage('Producto actualizado correctamente');

      // Limpiar el formulario
      setName('');
      setSize('');
      setColor('');
      setTotalAmount('');
      setCategoryId(''); // Limpiar el campo de categoría
      setPrice('');
      setDescription('');
      setGender(''); // Limpiar el campo de género
      setFile(null);
      setUploadedImageUrl('');
      setProductIdToEdit('');
    } catch (error) {
      console.error('Error al actualizar el producto:', error.message);
      setError('Error al actualizar el producto: ' + error.message);
    }
  };

  const handleProductIdChange = (e) => {
    setProductIdToEdit(e.target.value);
  };
  const handleLogout = () => {
    logout();
    navigate('/');
};

  return (
    <div id="updateproduct-page">
                  <div className="nav-header">
                <p className="Producto subido">Administrador</p>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
      <div className="update-container">
        <div className="product-form">
          <h1 className="Product">Actualizar Producto</h1>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
          
              <input
                type="text"
                value={productIdToEdit}
                onChange={handleProductIdChange}
                placeholder="ID del producto"
              />
            </div>
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
            <div className="form-group">
  
              <select value={categoryId} onChange={handleCategoryChange}>
                <option value="">Selecciona una categoría</option>
                <option value="1">Camisas</option>
                <option value="2">Pantalones</option>
                <option value="3">Chaquetas</option>
                <option value="4">Zapatos</option>
              </select>
            </div>
            <div className="form-group">

              <select value={gender} onChange={handleGenderChange}>
                <option value="">Selecciona un género</option>
                <option value="male">Hombre</option>
                <option value="female">Mujer</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
            <label>Cantidad Producto</label>
            <div className="form-group">
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
              />
            </div>
            <label>Precio</label> 
            <div className="form-group">
         
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

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción del producto"
              ></textarea>
            </div>
            <div className="form-group">
  <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
  />
  {uploadedImageUrl && (
    <div className="image-preview-container">
      <img
        src={uploadedImageUrl}
        alt="Vista previa"
        className="image-preview"
      />
    </div>
  )}
</div>

            <button type="submit">Actualizar Producto</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;


