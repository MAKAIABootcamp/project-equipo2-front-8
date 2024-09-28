import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../../redux/auth/authSlice';
import logoImage from '../../assets/SKILLMATE-2.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); 
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(store => store.auth);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-color-1 p-4 flex justify-between items-center relative">
      <Link to="/" className="flex items-center">
        <img src={logoImage} alt="Skillmate Logo" className="h-12 mr-2" /> 
      </Link>

      <button
        className="block lg:hidden text-color-2 focus:outline-none transition-transform duration-300 z-20"
        onClick={toggleMenu}
      >
        <svg
          className={`w-8 h-8 transition-transform duration-300 ease-in-out ${menuOpen ? 'rotate-45' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
        </svg>
      </button>


      <div
        className={`lg:flex lg:items-center lg:space-x-8 absolute lg:static top-16 left-0 w-full lg:w-auto bg-color-1 lg:bg-transparent transition-all duration-500 ease-in-out transform ${
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } lg:translate-y-0 lg:opacity-100 p-4 lg:p-0 z-10`}
        style={{ transformOrigin: 'top' }}
      >
        <ul className="flex flex-col lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0 items-center lg:items-center">
          <li>
            <Link to="/inicio" className="font-montserrat font-medium text-color-2 hover:text-color-5 transition-colors duration-300 ease-in-out focus:border-b-2 focus:border-white">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/practica" className="font-montserrat font-medium text-color-2 hover:text-color-5 transition-colors duration-300 ease-in-out focus:border-b-2 focus:border-white">
              Práctica de entrevista
            </Link>
          </li>
          <li>
            <Link to="/tips" className="font-montserrat font-medium text-color-2 hover:text-color-5 transition-colors duration-300 ease-in-out focus:border-b-2 focus:border-white">
              Tips
            </Link>
          </li>
          <li>
            <Link to="/plantillas" className="font-montserrat font-medium text-color-2 hover:text-color-5 transition-colors duration-300 ease-in-out focus:border-b-2 focus:border-white">
              Plantillas descargables
            </Link>
          </li>
          {isAuthenticated && (
            <li className="mt-4 lg:mt-0">
              <button
                onClick={handleLogout}
                className="font-dosis bg-color-2 text-color-3 font-bold py-2 px-4 rounded-md hover:bg-color-5 hover:text-color-2 transition duration-300 ease-in-out"
              >
                Cerrar sesión
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

