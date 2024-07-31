import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Server/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Organismos/Header/Header";
import Navar from "../../Components/Organismos/Navar/Navar";
import Button from "../../Components/Atomos/Button/Button";
import "./AccountPage.css";

const AccountPage = () => {
  const { user, login } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserData(user.first_name);
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  const fetchUserData = async (firstName) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/name/${firstName}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }

      const data = await response.json();
      setId(data.user_id);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
      setUserPassword(data.password);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      setError("Error al obtener los datos del usuario: " + error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!currentPassword) {
      setError("Debe ingresar su contraseña actual para actualizar los datos.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password || userPassword,
          update_by: "cato",
          deleted: 0,
          rol_id: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar los datos del usuario");
      }

      const data = await response.json();
      setSuccessMessage("Datos actualizados correctamente");
      console.log("Datos actualizados correctamente:", data);

      login({
        first_name: firstName,
      });

      navigate("/");
    } catch (error) {
      console.error("Error al actualizar los datos del usuario:", error);
      setError("Error al actualizar los datos del usuario: " + error.message);
    }
  };

  return (
    <div>
      <Header />
      <Navar title="Cuenta de Usuario" />
      <div className="Principal">
        <div className="account-page-container">
          <h1>
            {firstName} {lastName}
          </h1>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {error && <div className="error-message">{error}</div>}
          <label>Nombre</label>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <label>Apellido</label>
            <div className="form-group">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <label>Email</label>
            <div className="form-group">
              <input
                className="todas"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Contraseña Actual</label>
              <div className="password-wrapper">
                <input
                  className="todas"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  <span
                    className={`eye-icon ${
                      showCurrentPassword ? "visible" : ""
                    }`}
                  ></span>
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Contraseña Nueva</label>
              <div className="password-wrapper">
                <input
                  className="todas"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span
                    className={`eye-icon ${showPassword ? "visible" : ""}`}
                  ></span>
                </button>
              </div>
            </div>
            <Button name="Actualizar" className="btn-update" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
