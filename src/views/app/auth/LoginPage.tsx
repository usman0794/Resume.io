import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
  const location = useLocation();
  const navigate  = useNavigate();
  const returnTo  = (location.state as { from?: string })?.from ?? null;

  const handleSuccess = (user: any) => {
    if (returnTo) {
      navigate(returnTo, { replace: true });
    } else {
      navigate(user?.role === 'admin' ? ROUTES.ADMIN_DASHBOARD : ROUTES.DASHBOARD, { replace: true });
    }
  };

  return <LoginForm returnTo={returnTo} onSuccess={handleSuccess} />;
};

export default LoginPage;
