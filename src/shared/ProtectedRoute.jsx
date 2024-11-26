import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const isAuthenticated = true;
  return <>{!isAuthenticated ? <Navigate to='/login' /> : <Outlet />}</>;
}

export default ProtectedRoute;
