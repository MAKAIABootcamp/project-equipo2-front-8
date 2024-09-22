import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoutes = ({
  isAuthenticated,
  redirectPath = "/login",
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate replace to={redirectPath} />;
  }
  return children || <Outlet />;
};

PrivateRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string,
  children: PropTypes.node,
};

export default PrivateRoutes;