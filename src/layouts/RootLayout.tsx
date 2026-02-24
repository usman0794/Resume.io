import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import ScrollToTop from '@/components/shared/ScrollToTop';

const RootLayout: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <ScrollToTop />
      <Outlet />
    </AuthProvider>
  </ThemeProvider>
);

export default RootLayout;
