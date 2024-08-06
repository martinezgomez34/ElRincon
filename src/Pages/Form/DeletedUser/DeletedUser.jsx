import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../../../Server/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import '../DeletedProduct/DeletedProduct.css';
import Header from '../../../Components/Organismos/Header/Header';
import Footer from '../../../Components/Organismos/Footer/Footer';

const DeleteUser = () => {
  const [userName, setUserName] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (!user || (user.rol_id_fk !== 3 && user.rol_id_fk !== 4)) {
      navigate('/FormLogin');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    clearTimeout(searchTimeoutRef.current);
    if (e.target.value) {
      searchTimeoutRef.current = setTimeout(() => {
        fetchUserByName(e.target.value);
      }, 500);
    }
  };

  const fetchUserByName = async (name) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/user/name/${name}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al buscar el usuario');
      }

      const userInfo = await response.json();
      setUserInfo(userInfo);
      setError('');
    } catch (error) {
      console.error('Error al buscar el usuario:', error.message);
      setUserInfo(null);
      setError('Usuario no encontrado');
    }
  };

  const handleDeleteUser = async () => {
    if (userInfo) {
      if (userInfo.rol_id_fk === 3) {
        setError('No se puede eliminar este usuario porque es el creador y fundador de la página.');
        return;
      }

      const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el usuario "${userInfo.first_name}"?`);
      
      if (confirmDelete) {
        try {
          const userId = parseInt(userInfo.user_id, 10);
          console.log('Eliminando usuario con ID:', userId);
          
          const response = await fetch(`http://127.0.0.1:3000/api/user/${userId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error de respuesta:', errorData);
            throw new Error(errorData.message || 'Error al eliminar el usuario');
          }
    
          alert('Usuario eliminado correctamente');
          setUserInfo(null);
          setUserName('');
          navigate('/HomeAdministration'); // Redirige a la página principal de administración
        } catch (error) {
          console.error(`Error al eliminar el usuario: ${error.message}`);
          setError('Error al eliminar el usuario: ' + error.message);
        }
      }
    }
  };

  return (
    <div>
      <div id="deleteuser-page">
        <div className="nav-header">
          <p className="Usuario eliminado">Administrador</p>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
        <div className="delete-container">
          <div className="user-form">
            <h1 className="User">Eliminar Usuario</h1>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <input
                type="text"
                value={userName}
                onChange={handleUserNameChange}
                placeholder="Nombre del usuario a eliminar"
              />
            </div>
            {userInfo && (
              <div className="user-card">
                <div className="user-details">
                  <h3>{userInfo.first_name} {userInfo.last_name}</h3>
                  <p>Correo Electrónico: {userInfo.email}</p>
                  <p>Rol: {userInfo.rol_id_fk}</p>
                  <button className="delete-button" onClick={handleDeleteUser}>
                    Eliminar Usuario
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeleteUser;
