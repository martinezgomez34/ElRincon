import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../Server/AuthContext';
import Header from '../../Components/Organismos/Header/Header';
import Navar from '../../Components/Organismos/Navar/Navar';
import Footer from '../../Components/Organismos/Footer/Footer';
import '../shoppingCart/shopping.css'; 

import Checkout from '../../Components/Organismos/Pay/Pay.jsx';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


const placeholderImage = 'http://127.0.0.1:3000/images/placeholder-image.jpg';

const initialOptions = {
  "client-id": "AXvDtdNtLNJ4MnR19gKSSb9S6RJBpcUQzQ1_oK32vTOqjwDTBVa-3P8RLmfCjgl8CXkgL_wt2Ks7wo0e",
  currency: "MXN",
  intent: "capture",
};

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState(''); 

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

        // Filtrar productos con estado "en proceso"
        const filteredProducts = data.filter(order => order.status === 'en proceso');
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

  const handleCheckout = async (orderIds) => {
    try {
      for(const orderId of orderIds){
        const response = await fetch(`http://127.0.0.1:3000/api/order/sell/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: 'pendiente',
            address,
            update_by:"cato"
          })
        });
  
        if (!response.ok) {
          throw new Error('Error updating order status and address');
        }
      }

      console.log('Order status and address updated successfully');
    } catch (error) {
      console.error('Error updating order status and address:', error);
    }
  };

  const handleDeleteProduct = async (orderId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/order/${orderId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error deleting product');
        }

        setProducts(products.filter(product => product.order_id !== orderId));
        const newTotal = products.reduce((sum, product) => product.order_id !== orderId ? sum + product.total : sum, 0);
        setTotal(newTotal);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  if (!products.length) {
    return (
      <div>
        <Header />
        <Navar />
        <div className="shopping-cart-container">
          <h1>Carrito de Compras</h1>
          <p>Tu carrito está vacío</p>
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
        <h1>Carrito de Compras</h1>
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <img
              src={product.url ? product.url : placeholderImage}
              alt={product.name || 'Producto'}
              id="productimage"
            />
            <div className="product-details">
              {product.name ? (
                <>
                  <h2>
                    {product.name} <span className="product-price">${product.price}</span>
                  </h2>
                  <p>Cantidad: {product.amount} <span className="product-total">Total: ${product.total.toFixed(2)}</span></p>
                </>
              ) : (
                <p>Hubo un problema con este producto. Es mejor eliminar el pedido.</p>
              )}
            </div>
            <button className="delete-button" onClick={() => handleDeleteProduct(product.order_id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        <div className="cart-total">
          <h2>Total: ${total.toFixed(2)}</h2>
        </div>
        <div className="cart-actions">
          <button className="continue-shopping-button" onClick={handleContinueShopping}>
            Seguir comprando
          </button>
        </div>
        <div>
          <h2>Dirección</h2>
          <input
            id="address"
            type="text"
            className="form-control"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div id="checkout-button">
          <PayPalScriptProvider options={initialOptions}>
            <Checkout 
              onApprove={(orderIds) => handleCheckout(orderIds)} 
              total={total} 
              orderIds={products.map(product => product.order_id)} // Pasar IDs de los pedidos
            />
          </PayPalScriptProvider>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
