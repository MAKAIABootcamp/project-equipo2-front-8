import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from '../Navbar/Navbar'; 
import Footer from '../Footer/Footer';  

const Layout = () => {
  const { isAuthenticated } = useSelector(store => store.auth);
  const location = useLocation();


  const noNavbarRoutes = ['/login', '/register', '/phoneLogin', '/verificationCode'];


  const showNavbarAndFooter = isAuthenticated && !noNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {showNavbarAndFooter && <Navbar />}
      <Outlet />
      {showNavbarAndFooter && <Footer />}
    </div>
  );
}

export default Layout;
