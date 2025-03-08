import { Navigate } from "react-router";
import PropTypes from "prop-types";
import { UseAuth } from "./UseAuth";

const ProtectedRoute = ({ element }) => {
  const { user } = UseAuth();
  return user ? element : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
