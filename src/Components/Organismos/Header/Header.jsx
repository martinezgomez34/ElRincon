import React, { useContext } from 'react';
import img from "../../../assets/Logotipo.png";
import Sesion from "../../Atomos/Sesion/Sesion";
import Titulo from "../../Atomos/Titulo/Titulo";
import "../Header/Header.css";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Server/AuthContext';

const Header = () => {
    const { user } = useContext(AuthContext); 
    return (
        <header>
            <Link to="/">
                <img src={img} alt="logo" />
            </Link>
            <div>
                <Titulo />
            </div>
            <div>    
                {!user ? (
                    <Sesion name="Iniciar Sesion" />
                ) : (
                    <div>
                        <span id='usuario'>Bienvenido {user.first_name}</span> {/* */}
                        {/* */}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
