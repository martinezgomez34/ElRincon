import React from 'react';
import { Link } from 'react-router-dom';
import "./Sesion.css"

const Sesion = ({ name,  }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0',  
                padding: '2px',
                borderRadius: '10px',
                backgroundColor: '#f0f0f0',
            }}
        >
            <Link to='/FormLogin' style={{ textDecoration: 'none' }}>
                <button className='BotonInicioss'
                    type="button"
                    
                >
                    {name}
                </button>
            </Link>
        </div>
    );
};

export default Sesion;
