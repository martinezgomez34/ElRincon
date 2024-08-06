import React, { useState, useContext, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../Server/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../EditUser/EditUser.css';

const EditUser = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [roleId, setRoleId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchTimeoutRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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

    const isFirstNameTaken = await checkFirstName(firstName, roleId, userId);
    if (isFirstNameTaken) {
      setError("El nombre de usuario ya está en uso");
      return;
    }

    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      rol_id: parseInt(roleId, 10),
      update_by: "cato"
    };

    try {
      const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar el usuario');
      }

      console.log('Usuario actualizado correctamente', data);
      setSuccess('Usuario actualizado correctamente');

      setPassword('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setUserId('');
      setRoleId('');
      setError('');

      navigate('/HomeAdministration');

    } catch (error) {
      console.error('Error al actualizar el usuario:', error.message);
      setError('Error al actualizar el usuario: ' + error.message);
    }
  };

  const validateField = (value) => {
    return typeof value === 'string' && value.trim() !== '';
  };

  const validateEmail = (value) => {
    return typeof value === 'string' && /\S+@\S+\.\S+/.test(value);
  };

  const validatePassword = (value) => {
    return typeof value === 'string' && value.length >= 8;
  };

  const handleSearch = (e) => {
    setUserName(e.target.value);
    clearTimeout(searchTimeoutRef.current);
    if (e.target.value) {
      searchTimeoutRef.current = setTimeout(() => {
        fetchUserByName(e.target.value);
      }, 2000);
    }
  };

  const fetchUserByName = async (name) => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/name/${name}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Error al buscar el usuario');
      }

      const user = await response.json();

      if (user.rol_id_fk === 3) {
        setError('No se puede modificar este usuario porque es el creador y fundador de la página.');
        setUserId("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setRoleId("");
        return;
      }

      setUserId(user.user_id || "");
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      setRoleId(user.rol_id_fk || "");
      setPassword("");
      setError("");
    } catch (error) {
      console.error(error);
      setError('Usuario no encontrado');
    }
  };

  const checkFirstName = async (firstName, roleId, currentUserId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/roles/${roleId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Error al verificar el nombre de usuario');
      }

      const users = await response.json();
      return users.some(user => user.first_name === firstName && user.user_id !== currentUserId);
    } catch (error) {
      console.error('Error al verificar el nombre de usuario:', error.message);
      return false;
    }
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
        {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre del usuario"
            value={userName}
            onChange={handleSearch}
          />
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
            <option value="4">Rol 1</option>
            <option value="5">Rol 2</option>
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
        <button type="submit" className="btn" style={{ backgroundColor: '#333', color: '#fff' }}>Actualizar</button>
      </form>
    </div>
  );
};

export default EditUser;
