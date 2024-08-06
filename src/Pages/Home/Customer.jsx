import React, { useEffect, useState } from 'react';
import Layout from "../../Components/Atomos/Layout/Layout";
import Card from "../../Components/Moleculas/Card/Card";
import Footer from "../../Components/Organismos/Footer/Footer";
import Header from "../../Components/Organismos/Header/Header";
import Navar from "../../Components/Organismos/Navar/Navar";
import '../Home/customer.css';

const Customer = () => {
    const [products, setProducts] = useState([]);
    const userName = "Iniciar Sesion";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/product');
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

        fetchProducts();
    }, []);

    return (
        <>
            <div>
                <Header userName={userName} />
                <Navar />
                <Layout />
                <div className="products-container">
                    {products
                        .filter(product => product.amount > 1) // Filtrar aquí
                        .map(product => (
                            <Card
                                key={product.product_id}
                                src={product.url}
                                name={product.name}
                                description={product.description}
                                precio={product.price}
                                productId={product.product_id}
                                amount={product.amount}
                            />
                        ))
                    }
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Customer;
