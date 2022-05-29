import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const AuthRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  return !user ? <LoadingToRedirect /> : children;
};

export default AuthRoute;
