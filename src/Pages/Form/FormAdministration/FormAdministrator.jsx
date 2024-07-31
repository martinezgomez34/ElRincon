import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../Components/Atomos/Button/Button";
import '../FormAdministration/FormAdministrator.css';
import { Link } from "react-router-dom";

const FormAdministrator = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form className="admin-form">
      <h1 className="admin-title">Iniciar Sesión</h1>
      <div className="admin-form-group">
        <div className="input-container">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input id="username" type="text" className="admin-form-control" placeholder="Usuario" />
        </div>
      </div>
      <div className="admin-form-group">
        <div className="input-container">
          <input
            id="password"
            type={passwordVisible ? "text" : "password"}
            className="admin-form-control"
            placeholder="Contraseña"
          />
          <FontAwesomeIcon
            icon={passwordVisible ? faEyeSlash : faEye}
            className="toggle-password-icon"
            onClick={togglePasswordVisibility}
          />
        </div>
      </div>
      <Link to="/HomeAdministration">
        <Button name="Entrar" className="admin-btn"></Button>
      </Link>
     </form>
  );
};

export default FormAdministrator;

