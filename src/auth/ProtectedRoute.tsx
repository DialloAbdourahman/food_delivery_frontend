import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to={'/'} replace />;
};

export default ProtectedRoute;
