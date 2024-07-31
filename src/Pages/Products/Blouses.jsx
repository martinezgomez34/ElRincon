import React, { useEffect, useState } from 'react';
import Card from "../../Components/Moleculas/Card/Card";
import Footer from "../../Components/Organismos/Footer/Footer";
import Header from "../../Components/Organismos/Header/Header";
import Navar from "../../Components/Organismos/Navar/Navar";
import '../Products/Product.css';

// Función para obtener los productos por categoría
const getProductsByCategory = async () => {
  try {
    const categoryId = 1; 
    const response = await fetch(`http://localhost:3000/api/product/category/${categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return [];
  }
};

const Blouses = () => {
  const [products, setProducts] = useState([]);
  const userName = "Cerrar Sesion";

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProductsByCategory();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
    <div className="Coat">
      <Header userName={userName} />
      <Navar className="ti-12" title="Blusas" />
      <div className="products-container">
        {products.map(product => (
          <Card
            key={product.product_id}
            src={product.url}
            name={product.name}
            description={product.description}
            precio={product.price}
            productId={product.product_id}
          />
        ))}
      </div>
      <Footer className="Footer" />
    </div>
  );
};

export default Blouses;
