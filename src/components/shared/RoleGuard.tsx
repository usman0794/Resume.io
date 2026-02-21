import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/rootReducer';
import { ROUTES } from '@/routes/routePaths';


interface RoleGuardProps {
  children: React.ReactNode;
  role: 'admin' | 'user';
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, role }) => {
  const user = useSelector((s: RootState) => s.userReducer.user);
  const loading = useSelector((s: RootState) => s.userReducer.loading);
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');

  // User profile still loading (initial authenticateUser() in flight) — wait, don't deny yet.
  if (hasToken && !user && loading) {
    return null;
  }

  if (!user || user.role !== role) {
    return <Navigate to={role === 'admin' ? ROUTES.DASHBOARD : ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;
