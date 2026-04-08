import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/rootReducer';


interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo = '/login' }) => {
  const location = useLocation();
  const isLoggedIn = useSelector((s: RootState) => s.userReducer.isLoggedIn);
  const user = useSelector((s: RootState) => s.userReducer.user);
  const loading = useSelector((s: RootState) => s.userReducer.loading);
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');

  // A token exists but the user profile hasn't loaded yet (initial authenticateUser()
  // call in main.tsx is still in flight). Wait instead of bouncing to login.
  if (hasToken && !user && loading) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
