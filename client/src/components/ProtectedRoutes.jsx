import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};
export const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "instructor") {
    return <Navigate to="/" />;
  }

  return children;
};

export const PurchaseProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);

  // If not authenticated, navigate to login page before allowing purchase
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, allow access to the purchase section (and other parts)
  return children;
};
