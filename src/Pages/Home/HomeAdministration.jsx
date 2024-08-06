import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Server/AuthContext';
import Button from '../../Components/Atomos/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import '../Home/HomeAdministration.css';

const HomeAdministration = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [totalPaidOrders, setTotalPaidOrders] = useState(0);
    const [pendingOrders, setPendingOrders] = useState([]);

    useEffect(() => {
        if (!user || (user.rol_id_fk !== 3 && user.rol_id_fk !== 4)) {
            navigate('/FormLogin');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/api/order/users/details/', {
                    headers: {
                        'Authorization': `Bearer ${user ? user.token : ''}`,
                    },
                });
                const orders = await response.json();

                const total = orders
                    .filter(order => order.status === 'pagado')
                    .reduce((sum, order) => sum + order.total, 0);
                setTotalPaidOrders(total);

                const pending = orders.filter(order => order.status === 'pendiente');
                setPendingOrders(pending);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleUpdateStatus = async (orderId) => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/order/sell/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user ? user.token : ''}`,
                },
                body: JSON.stringify({
                    update_by: user.email,
                    status: 'pagado',
                    email: user.email,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setPendingOrders(prevOrders =>
                prevOrders.filter(order => order.order_id !== orderId)
            );

            const updatedOrdersResponse = await fetch('http://127.0.0.1:3000/api/order/users/details/', {
                headers: {
                    'Authorization': `Bearer ${user ? user.token : ''}`,
                },
            });
            const updatedOrders = await updatedOrdersResponse.json();
            const total = updatedOrders
                .filter(order => order.status === 'pagado')
                .reduce((sum, order) => sum + order.total, 0);
            setTotalPaidOrders(total);

        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div>
            <div className="nav-header">
                <p className="Producto subido">Administrador</p>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>

            <div className="products-container">
                <div className='card-2'>
                    <h1>Agregar Productos</h1>
                    <Link to="/uploadproduct">
                        <Button name="Entrar" className="btn-col-123"></Button>
                    </Link>
                </div>

                <div className='card-2'>
                    <h1>Actualizar Productos</h1>
                    <Link to="/updateproduct">
                        <Button name="Entrar" className="btn-col-123"></Button>
                    </Link>
                </div>

                <div className='card-2'>
                    <h1>Agregar Usuarios-Admin</h1>
                    <Link to="/AddAdmins">
                        <Button name="Entrar" className="btn-col-123"></Button>
                    </Link>
                </div>

                <div className='card-2'>
                    <h1>Modificar Usuarios-Admin</h1>
                    <Link to="/EditUser">
                        <Button name="Entrar" className="btn-col-123"></Button>
                    </Link>
                </div>

                <div className='card-2'>
                    <h1>Eliminar Productos</h1>
                    <Link to="/deleteproduct">
                        <Button name="Entrar" className="btn-col-123"></Button>
                    </Link>
                </div>

                <div className='card-2'>
                    <h1>Eliminar Usuarios-Admin</h1>
                    <Link to="/DeleteAdmins">
                        <Button name="Entrar" className="btn-col-123"></Button>
                    </Link>
                </div>
            </div>

            <div className="total-paid-orders">
                <label>Total de ganancias este mes: ${totalPaidOrders.toFixed(2)}</label>
            </div>

            <div className="pending-orders-container">
                <h2>Pedidos Pendientes</h2>
                {pendingOrders.length === 0 ? (
                    <p>No hay pedidos pendientes.</p>
                ) : (
                    pendingOrders.map((order) => (
                        <div key={order.order_id} className="pending-order-card">
                            <img src={order.product_image_url} alt={order.product_name} className="order-image" />
                            <div className="order-details">
                                <h3>Producto: {order.product_name}</h3>
                                <p>Cantidad: {order.amount}</p>
                                <p>Total: ${order.total.toFixed(2)}</p>
                                <p>Usuario: {order.first_name}</p>
                                <button onClick={() => handleUpdateStatus(order.order_id)}>Marcar como Pagado</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default HomeAdministration;
