import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoutes = ({ isAuthenticated, redirectPath = "/", children }) => {
  if (isAuthenticated) {
    return <Navigate replace to={redirectPath} />;
  }
  return children || <Outlet />;
};

PublicRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string,
  children: PropTypes.node,
};

export default PublicRoutes;