import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

function ProtectedRoute() {
  const { auth } = useAuth();
  if (auth.loading) {
    return <p>loading . . .</p>;
  }

  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
