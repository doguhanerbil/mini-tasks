import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../api/client';

/**
 * Route guard – renders child routes only when a JWT exists.
 * Redirects to /login otherwise.
 */
export default function ProtectedRoute() {
  const token = getToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
