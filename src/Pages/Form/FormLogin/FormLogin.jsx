import React, { useState, useContext } from "react";
import { AuthContext } from "../../../Server/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../Components/Atomos/Button/Button";
import '../FormLogin/FormLogin.css';
import { Link, useNavigate } from "react-router-dom";

function FormLogin() {
    const [first_name, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (first_name === "" || password === "") {
            setErrorMessage("Por favor, complete todos los campos.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ first_name, password })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error en la red');
            }

            const data = await response.json();

            if (data.token) {
                const userResponse = await fetch(`http://localhost:3000/api/user/name/${first_name}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${data.token}`
                    }
                });

                if (!userResponse.ok) {
                    const userData = await userResponse.json();
                    throw new Error(userData.message || 'Error en la red');
                }

                const userData = await userResponse.json();

                login({ ...userData, token: data.token });

                if (userData.rol_id_fk === 3 || userData.rol_id_fk === 4) {
                    navigate('/HomeAdministration'); 
                } else {
                    setSuccessMessage("Usuario ha iniciado sesión correctamente.");
                    navigate('/'); 
                }
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error al iniciar sesión: ' + error.message);
        }
    };

    return (
        <section className="SeccionForm">
            <div className="contendor-doble">
                <div className="Contenedor1">
                    {/* Aquí podrías agregar contenido si es necesario */}
                </div>

                <div className="Contenedor2">
                    <div className="ContenedorForm">
                        <form className="Formulario" onSubmit={handleSubmit}>
                            <h3>Iniciar Sesión</h3>
                            
                            <label className="Label">
                                <FontAwesomeIcon icon={faUser} className="input-icon" />
                                <input
                                    type="text"
                                    className="InputLogeate"
                                    placeholder="Usuario"
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    aria-label="Nombre de usuario"
                                />
                            </label>

                            <label className="Label">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    className="InputLogeate2"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    aria-label="Contraseña"
                                />
                            </label>
                            <FontAwesomeIcon
                                icon={passwordVisible ? faEyeSlash : faEye}
                                className="toggle-password-icon"
                                onClick={togglePasswordVisibility}
                            />

                            <div className="MovBoton">
                                <Button name="Entrar" className="BotonInicio" />
                            </div>

                            {successMessage && <div className="success-message">{successMessage}</div>}
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                            
                            <div className="regis-container">
                                <p className="">No tiene Cuenta</p>
                                <Link to="/FormRegistro">Registrarse</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FormLogin;
