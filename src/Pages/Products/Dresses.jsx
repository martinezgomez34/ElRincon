import React, { useEffect, useState } from 'react';
import Footer from "../../Components/Organismos/Footer/Footer";
import Header from "../../Components/Organismos/Header/Header";
import Navar from "../../Components/Organismos/Navar/Navar";
import Card from "../../Components/Moleculas/Card/Card";
import '../Products/Product.css';

const Dresses = () => {
    const [products, setProducts] = useState([]);
    const userName = "Cerrar Sesion";

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/product/category/3');
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
            <Header userName={userName} />
            <Navar className="ti-12" title="Vestidos" />
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

export default Dresses;
