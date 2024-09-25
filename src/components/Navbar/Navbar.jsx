import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../../redux/auth/authSlice';
import logoImage from '../../assets/SKILLMATE-2.png';

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(store => store.auth);
  
    const handleLogout = () => {
      dispatch(logoutThunk());
    };
  
    return (
      <nav className="bg-color-1 p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logoImage} alt="Skillmate Logo" className="h-12 mr-2" /> 
        </Link>
        <div className="space-x-8 mr-2">
          <Link to="/inicio" className="font-montserrat font-medium text-color-2 hover:text-color-5 transition-colors duration-300 ease-in-out focus:border-b-2 focus:border-white">Inicio</Link>
          <Link to="/practica" className="font-montserrat font-medium text-color-2 hover:text-color-5 transition-colors duration-300 ease-in-out">Práctica de entrevista</Link>
          <Link to="/tips" className="font-montserrat font-medium text-color-2 hover:text-color-5 transition-colors duration-300 ease-in-out">Tips</Link>
          <Link to="/plantillas" className="font-montserrat font-medium text-color-2 hover:text-color-5 transition-colors duration-300 ease-in-out">Plantillas descargables</Link>
          {isAuthenticated && (
            <button onClick={handleLogout} className="font-dosis bg-color-2 text-color-3 font-bold py-2 px-4 rounded-md hover:bg-color-5 hover:text-color-2 transition duration-300 ease-in-out">Cerrar sesión</button>
          )}
        </div>
      </nav>
    );
  };
  
  export default Navbar;