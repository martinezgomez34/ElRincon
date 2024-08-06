import React, { useEffect, useState } from 'react';
import Card from "../../Components/Moleculas/Card/Card";
import Footer from "../../Components/Organismos/Footer/Footer";
import Header from "../../Components/Organismos/Header/Header";
import Navar from "../../Components/Organismos/Navar/Navar";
import '../Products/Product.css';

const Coat = () => {
    const [products, setProducts] = useState([]);
    const Username = "Cerrar Sesion";

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/product/category/2');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error("Failed to fetch products: ", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProductsByCategory();
    }, []);

    return (
        <div className="Coat">
        <Header userName={Username}></Header>
        <Navar className="ti-12" title="Sacos"></Navar>
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
        <div className='contenedorAbajo'>
          {/* Aquí podrías añadir contenido adicional si es necesario */}
        </div>
        <div className='Abajo'>
          <Footer></Footer>
        </div>
      </div>
      
    );
};

export default Coat;
