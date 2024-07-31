import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Server/AuthContext";
import Header from '../../Components/Organismos/Header/Header';
import Navar from '../../Components/Organismos/Navar/Navar';
import Footer from '../../Components/Organismos/Footer/Footer';
import '../SingleOrder/SingleOrder.css';

const SingleOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [order, setOrder] = useState({
        user_id: null,
        status: "en proceso",
        total: 0,
        created_by: "admin",
        update_by: "admin",
        deleted: false
    });
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loginError, setLoginError] = useState(""); 

    useEffect(() => {
        if (!user || !user.first_name || !user.token) {
            setLoginError("Debe iniciar sesión para realizar un pedido.");
            return;
        }

        setLoginError(""); 

        const fetchUserData = async () => {
            try {
                const userResponse = await fetch(`http://localhost:3000/api/user/name/${user.first_name}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (!userResponse.ok) {
                    throw new Error('Network response was not ok ' + userResponse.statusText);
                }

                const userData = await userResponse.json();
                console.log('User data fetched:', userData);

                setOrder(prevOrder => ({
                    ...prevOrder,
                    user_id: userData.user_id,
                    created_by: userData.first_name,
                    update_by: userData.first_name
                }));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();

        if (location.state && location.state.product) {
            const product = location.state.product;
            setProducts([{
                product_id: product.product_id,
                image: product.url,
                name: product.name,
                price: product.price,
                amount: 1,
                availableAmount: 0 
            }]);
            setOrder(prevOrder => ({
                ...prevOrder,
                total: parseFloat(product.price).toFixed(2)
            }));


            fetchProductAmount(product.product_id);
        }
    }, [location, user]);

    const fetchProductAmount = async (productId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/product/${productId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const productData = await response.json();
            setProducts(prevProducts => prevProducts.map(product =>
                product.product_id === productId
                    ? { ...product, availableAmount: productData.amount }
                    : product
            ));
        } catch (error) {
            console.error('Error fetching product amount:', error);
        }
    };

    const handleProductChange = (e, index) => {
        const { name, value } = e.target;
        const updatedProducts = [...products];
        const numericValue = parseFloat(value);

        if (name === "amount") {
            if (numericValue <= 0 || isNaN(numericValue)) {
                setError("La cantidad debe ser un número positivo mayor que cero.");
                return;
            }

            if (numericValue > updatedProducts[index].availableAmount) {
                setError(`La cantidad solicitada excede el stock disponible (${updatedProducts[index].availableAmount}).`);
                return;
            } else {
                setError("");
            }
        }

        updatedProducts[index] = {
            ...updatedProducts[index],
            [name]: numericValue
        };
        setProducts(updatedProducts);
        calculateTotal(updatedProducts);
    };

    const calculateTotal = (updatedProducts) => {
        const total = updatedProducts.reduce((acc, product) => {
            return acc + (product.price * product.amount);
        }, 0).toFixed(2);
        setOrder(prevOrder => ({
            ...prevOrder,
            total
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (error || loginError) {
            console.error("Form submission prevented due to errors.");
            return;
        }

        const orderData = {
            order: {
                user_id: order.user_id,
                status: order.status,
                total: order.total,
                created_by: order.created_by,
                update_by: order.update_by,
                deleted: order.deleted
            },
            products: products.map(product => ({
                product_id: product.product_id,
                amount: product.amount
            }))
        };
        console.log('Data being sent to the API:', orderData);

        try {
            const response = await fetch('http://localhost:3000/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Order created:', data);
                navigate('/shoppingcart', { state: { product: products[0] } });
            } else {
                console.error('Failed to create order:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div>
            <Header />
            <Navar />
            <div className="single-order-container">
                <h2>Products</h2>
                {loginError && <div className="error-message">{loginError}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="products-list">
                        {products.map((product, index) => (
                            <div key={index} className="product-item">
                                <div id="product-image">
                                    <img src={product.image} alt={`Product ${product.product_id}`} />
                                </div>
                                <div className="product-details">
                                    <p><strong>Name:</strong> {product.name}</p>
                                    <p><strong>Price:</strong> ${product.price}</p>
                                    <label>
                                        <strong>Amount:</strong>
                                        <input
                                            type="number"
                                            name="amount"
                                            value={product.amount}
                                            onChange={(e) => handleProductChange(e, index)}
                                        />
                                    </label>
                                    <p><strong>Total:</strong> ${(product.price * product.amount).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="submit-button" disabled={loginError}>Submit Order</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default SingleOrder;
