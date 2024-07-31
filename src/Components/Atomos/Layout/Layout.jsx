import image from "../../../assets/Card.png";
import "../Layout/Layout.css";
const Layout = () => {
    return (
        <div className="cad">
            <p className="col-1">
                ¡Renueva tu estilo con nuestra ropa de calidad! Blusas, vestidos y sacos, todo en textil de lujo.
            </p>
            <div className="img-container">
                <img src={image} className="image" />
            </div>
        </div>
    );
};

export default Layout;
