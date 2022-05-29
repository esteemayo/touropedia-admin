import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => ({ ...state.auth }));

  return user ? (
    <Navigate to='/' replace state={{ from: location }} />
  ) : (
    children
  );
};

export default ProtectedRoute;
