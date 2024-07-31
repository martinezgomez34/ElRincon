import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../Server/AuthContext'; // Importar el contexto de autenticación
import '../EditUser/EditUser.css'; // Asegúrate de que este archivo tenga estilos adecuados para tonalidades grises
import Header from '../../../Components/Organismos/Header/Header';
import Navar from '../../../Components/Organismos/Navar/Navar';
import Footer from '../../../Components/Organismos/Footer/Footer';

const EditUser = () => {
  const { user } = useContext(AuthContext); // Obtener el usuario del contexto
  const [userId, setUserId] = useState(""); // ID del usuario en la URL
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [roleId, setRoleId] = useState(""); // ID del rol en el cuerpo de la solicitud
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar cualquier error previo al enviar el formulario
    setSuccess(""); // Limpiar cualquier mensaje de éxito previo

    // Validaciones del formulario
    if (!validateField(userId)) {
      setError("El ID de usuario es requerido");
      return;
    }
    if (!validateField(firstName)) {
      setError("El campo Nombre es requerido");
      return;
    }
    if (!validateField(lastName)) {
      setError("El campo Apellido es requerido");
      return;
    }
    if (!validateEmail(email)) {
      setError("El correo electrónico no es válido");
      return;
    }
    if (password && !validatePassword(password)) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (!validateField(roleId)) {
      setError("El rol es requerido");
      return;
    }

    const updatedUser = {
      rol_id: parseInt(roleId, 10), // Convertir el rol a número
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      update_by: "cato"
    };

    try {
      const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` // Usar el token del contexto
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar el usuario');
      }

      console.log('Usuario actualizado correctamente', data);
      setSuccess('Usuario actualizado correctamente');

      // Limpiar el formulario después de una actualización exitosa
      setPassword('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setUserId('');
      setRoleId(''); // Limpiar el rol
      setError(''); // Limpiar cualquier mensaje de error después de la actualización exitosa

    } catch (error) {
      console.error('Error al actualizar el usuario:', error.message);
      setError('Error al actualizar el usuario: ' + error.message);
    }
  };

  const validateField = (value) => {
    return value.trim() !== '';
  };

  const validateEmail = (value) => {
    // Validación de correo electrónico básica
    return /\S+@\S+\.\S+/.test(value);
  };

  const validatePassword = (value) => {
    return value.length >= 8;
  };
  const handleLogout = () => {
    logout();
    navigate('/');
};

  return (
    <div>
                        <div className="nav-header">
                <p className="Producto subido">Administrador</p>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
    <form className="form" onSubmit={handleSubmit} style={{ backgroundColor: '#f5f5f5', color: '#333' }}>
      <h1 className="titl-19">Modificar Usuario</h1>
      <div className="form-group">
        <input
          id="userId"
          type="text"
          className="form-control"
          placeholder=" "
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <label htmlFor="userId">ID de Usuario</label>
      </div>
      <div className="form-group">
        <input
          id="firstName"
          type="text"
          className="form-control"
          placeholder=" "
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="firstName">Nombre</label>
      </div>
      <div className="form-group">
        <input
          id="lastName"
          type="text"
          className="form-control"
          placeholder=" "
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="lastName">Apellido</label>
      </div>
      <div className="form-group">
        <input
          id="email"
          type="email"
          className="form-control"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">Correo Electrónico</label>
      </div>
      <div className="form-group">
        <select
          id="roleId"
          className="form-control"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
        >
          <option value="">Seleccionar Rol</option>
          <option value="1">Rol 1</option>
          <option value="2">Rol 2</option>
          <option value="3">Rol 3</option>
          {/* Agrega más opciones de rol según sea necesario */}
        </select>
        <label htmlFor="roleId">Rol</label>
      </div>
      <div className="form-group">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password">Contraseña Nueva (Opcional)</label>
        <span
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </span>
      </div>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}
      <button type="submit" className="btn" style={{ backgroundColor: '#333', color: '#fff' }}>Actualizar</button>
    </form>
  
    </div>
  );
};

export default EditUser;
