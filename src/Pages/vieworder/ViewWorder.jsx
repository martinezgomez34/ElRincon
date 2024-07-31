import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../Components/Organismos/Header/Header';
import Navar from '../../Components/Organismos/Navar/Navar';
import Footer from '../../Components/Organismos/Footer/Footer';
import '../vieworder/ViewWorder.css'; 

const ViewWorder = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/product/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Failed to fetch product: ", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleBuyProduct = () => {
    navigate('/shoppingcart', { state: { product } });
  };

  const handleBuyOnlyProduct = () => {
    navigate('/singleorder', { state: { product } });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div>
      <Header />
      <Navar />
      <div className="viewworder-container">
        <div className="product-image-container">
          <img src={product.url} alt={product.name} className="product-image" />
        </div>
        <div className="product-details-container">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <div className="price-amount-container">
            <p className="product-amount">Disponibles: {product.amount}</p>
            <p className="product-price">${product.price}</p>
          </div>
          <button className='buy-button'onClick={handleBuyOnlyProduct}>Ordenar</button>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default ViewWorder;
