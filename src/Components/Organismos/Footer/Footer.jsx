import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebookSquare,faTwitter,faInstagramSquare,} from "@fortawesome/free-brands-svg-icons";
import "../Footer/Footer.css";

const Footer = () => {
    const email = "kbobi761@gmail.com";
    const phoneNumber = "+529671787180";

    return (
        <footer className="footer">
            <h1 className="text-center">© 2024 - El Rincón De Los Textiles</h1>
            <div className="social-icons">
                <a href="https://www.facebook.com/profile.php?id=100065104508189">
                    <FontAwesomeIcon icon={faFacebookSquare} />
                </a>
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faInstagramSquare}/>
            </div>
            <div className="navbar">
                <p className="p-12 ">San Cristobal De Las Casas Chiapas, México</p>
                <p className="correct">
                    <p className="correct">
                        Correo:{" "}
                        <a href={`mailto:${email}`} style={{ color: "#181818" }}>
                            {email}
                        </a>
                    </p>
                </p>
                <p className="tel">
                    Teléfono:{" "}
                    <a href={`tel:${phoneNumber}`} style={{ color: "#181818" }}>
                        {phoneNumber}
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
