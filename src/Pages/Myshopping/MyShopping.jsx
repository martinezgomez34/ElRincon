import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Server/AuthContext';
import Header from '../../Components/Organismos/Header/Header';
import Navar from '../../Components/Organismos/Navar/Navar';
import Footer from '../../Components/Organismos/Footer/Footer';

import '../Myshopping/MyShopping.css';
const Myshopping = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`http://127.0.0.1:3000/api/user/name/${user.first_name}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!userResponse.ok) {
          throw new Error('Error fetching user data');
        }

        const userData = await userResponse.json();
        const userId = userData.user_id;
        console.log('User data fetched:', userData);

        const response = await fetch(`http://127.0.0.1:3000/api/order/user/products/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching user products');
        }

        const data = await response.json();
        console.log('Data fetched:', data);

        const filteredProducts = data.filter(order => order.status === 'pagado');
        setProducts(filteredProducts);

        const totalAmount = filteredProducts.reduce((sum, order) => sum + order.total, 0);
        setTotal(totalAmount);
      } catch (error) {
        console.error('Error fetching user products:', error);
      }
    };

    if (user && user.first_name && user.token) {
      fetchUserData();
    }
  }, [user]);

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    console.log('Realizar el checkout con los productos:', products, 'y total:', total);
  };

  if (!products.length) {
    return (
      <div>
        <Header />
        <Navar />
        <div className="shopping-cart-container">
          <h1>Productos adquiridos</h1>
          <p>Aun no ha tenido compras suficientes, intente comprar algo, no se arrepentira :3</p>
          <div className="cart-actions">
            <button className="continue-shopping-button" onClick={handleContinueShopping}>
              Seguir comprando
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Navar />
      <div className="shopping-cart-container">
        <div className='Direccion'>
        <h1>Mis Compras</h1>
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <img src={product.url} alt={product.name} className="product-image" />
            <div className="product-details">
              <h2>
                {product.name} <span className="product-price">${product.price}</span>
              </h2>
              <p>Cantidad: {product.amount} <span className="product-total">Total gastado: ${product.total.toFixed(2)}</span></p>
            </div>
          </div>
        ))}
        <div className="cart-total">
          <h2>Total: ${total.toFixed(2)}</h2>
        </div>
        <div className="cart-actions">
          <button className="continue-shopping-button" onClick={handleContinueShopping}>
            volver al menu
          </button>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Myshopping;
