import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../../../Server/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import '../DeletedProduct/DeletedProduct.css';
import Header from '../../../Components/Organismos/Header/Header';
import Footer from '../../../Components/Organismos/Footer/Footer';

const DeleteProduct = () => {
  const [productName, setProductName] = useState('');
  const [productInfo, setProductInfo] = useState(null);
  const [error, setError] = useState('');
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (!user || (user.rol_id_fk !== 3 && user.rol_id_fk !== 4)) {
      navigate('/FormLogin');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
    clearTimeout(searchTimeoutRef.current);
    if (e.target.value) {
      searchTimeoutRef.current = setTimeout(() => {
        fetchProductByName(e.target.value);
      }, 500);
    }
  };

  const fetchProductByName = async (name) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/product/name/${name}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al buscar el producto');
      }

      const product = await response.json();
      setProductInfo(product);
      setError('');
    } catch (error) {
      console.error(error);
      setProductInfo(null);
      setError('Producto no encontrado');
    }
  };

  const handleDeleteProduct = async () => {
    if (productInfo) {
      const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el producto "${productInfo.name}"?`);

      if (confirmDelete) {
        try {
          const response = await fetch(`http://127.0.0.1:3000/api/product/${productInfo.product_id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });

          if (!response.ok) {
            throw new Error('Error al eliminar el producto');
          }

          alert('Producto eliminado correctamente');
          setProductInfo(null);
          setProductName('');
        } catch (error) {
          console.error('Error al eliminar el producto:', error.message);
          setError('Error al eliminar el producto: ' + error.message);
        }
      }
    }
  };

  const genderOptions = {
    male: 'Hombre',
    female: 'Mujer',
    unisex: 'Unisex'
  };
  
  const colorOptions = {
    1: 'Rojo',
    2: 'Azul',
    3: 'Amarillo',
    4: 'Verde',
    5: 'Negro',
    6: 'Blanco',
    7: 'Naranja',
    8: 'Morado',
    9: 'Rosa',
    10: 'Gris',
    999: 'Ninguno'
  };
  
  const sizeOptions = {
    1: 'S (Chica)',
    2: 'M (Mediana)',
    3: 'L (Grande)',
    4: 'XL (Extra Grande)'
  };

  return (
    <div>
    <div id="deleteproduct-page">
      <div className="nav-header">
        <p className="Producto eliminado">Administrador</p>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      <div className="delete-container">
        <div className="product-form">
          <h1 className="Product">Eliminar Producto</h1>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <input
              type="text"
              value={productName}
              onChange={handleProductNameChange}
              placeholder="Nombre del producto a eliminar"
            />
          </div>
          {productInfo && (
            <div className="product-card">
              <img src={productInfo.url} alt={productInfo.name} id="product-image" />
              <div className="product-details">
                <h3>{productInfo.name}</h3>
                <p>Descripción: {productInfo.description}</p>
                <p>Precio: ${parseFloat(productInfo.price).toFixed(2)}</p>
                <p>Cantidad: {productInfo.amount}</p>
                <p>Talla: {sizeOptions[productInfo.size_id_fk]}</p>
                <p>Color: {colorOptions[productInfo.color_id_fk]}</p>
                <p>Género: {genderOptions[productInfo.gender]}</p>
                <button className="delete-button" onClick={handleDeleteProduct}>
                  Eliminar Producto
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default DeleteProduct;
