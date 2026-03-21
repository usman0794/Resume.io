import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';
import SignupForm from './components/SignupForm';

const SignupPage = () => {
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

  return <SignupForm returnTo={returnTo} onSuccess={handleSuccess} />;
};

export default SignupPage;
