import "../Card/Card.css"; 
import { useNavigate } from 'react-router-dom';

const Card = ({ src, name, description, precio, productId, amount }) => {
    const navigate = useNavigate();

    const handleViewProduct = () => {
        navigate(`/ViewWorder/${productId}`);
    };

    const stockMessage = amount > 20 ? "stock" : "por acabar";
    const stockMessageId = amount > 20 ? "stock-message" : "low-stock-message"; 

    return (
        <div className="card-container">
            <img src={src} alt={name} className="card-image" />
            <div className="card-content">
                <h2>{name}</h2>
                <p id="description">{description}</p>
                <p id="price">${precio}</p>
                <p id={stockMessageId}>{stockMessage}</p> {/* */}
                <button className="card-button" onClick={handleViewProduct}>Comprar</button>
            </div>
        </div>
    );
};

export default Card;
