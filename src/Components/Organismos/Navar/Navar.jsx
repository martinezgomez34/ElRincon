import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../Navar/Navar.css";
import Dropdown from "../../Moleculas/Dropdown/Dropdown";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Server/AuthContext";

const Navar = ({ title, className }) => {
  const { user } = useContext(AuthContext);

  return (
    <nav className={`hol-3 ${className}`}>
      <Dropdown />
      <div className="nav-links">
        <div className="separacion">
          <div className="TodosLosTex">
            {user ? (
              <NavLink to="/ViewCount">{user.first_name}</NavLink>
            ) : (
              <NavLink to="/FormRegistro">Cuenta</NavLink>
            )}
          </div>

          <div className="TodosLosTex">
            <NavLink to="/InfoPage">Acerca de</NavLink>
          </div>

          <div className="TodosLosTex">
            <NavLink to="/shoppingcart">
              <button
                className="icon-cart-button"
                aria-label="Carrito de compras"
              >
                <FontAwesomeIcon icon={faCartShopping} className="icon-cart" />
              </button>
            </NavLink>
          </div>

          <div className="TodosLosTex">
            <NavLink to="/MyShoppings">
              <button className="botones">
                Mis Compras
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navar;
