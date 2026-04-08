import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <Outlet />
  </div>
);

export default AuthLayout;
