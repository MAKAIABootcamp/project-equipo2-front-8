import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { logoutThunk } from "../../redux/auth/authSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(store=>store.auth);

  const handleLogout = () => dispatch(logoutThunk());

  return (
    <div>
      {isAuthenticated && <button onClick={handleLogout}>Cerrar sesión</button>}
      Layout
      <Outlet />
    </div>
  )
}

export default Layout