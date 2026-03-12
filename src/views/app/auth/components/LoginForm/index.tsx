import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAppDispatch } from '@/store';
import { loginUser, socialLogin } from '@/store/actions/userActions';
import { ROUTES } from '@/routes/routePaths';
import GlobalError from '../FormAtoms/GlobalError';
import FieldError from '../FormAtoms/FieldError';

/* ── Icons ── */
const FbIconWhite = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path fill="white" d="M9.73 6.486v2.478H8v3.03h1.73l.013 8.506h3.552l-.014-8.505h2.384s.223-1.453.331-3.042h-2.701V6.881c0-.31.387-.726.77-.726H16V3h-2.631c-3.728 0-3.64 3.033-3.64 3.486z" />
  </svg>
);

const GoogleIconWhite = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M19 12.306C19 11.82 18.961 11.332 18.877 10.855L12.14 10.855V13.605H15.998C15.838 14.492 15.324 15.276 14.57 15.775V17.56H16.872C18.223 16.316 19 14.479 19 12.306Z" fill="white" />
    <path d="M12.14 19.283C14.067 19.283 15.691 18.651 16.874 17.559L14.573 15.775C13.933 16.21 13.106 16.457 12.143 16.457C10.28 16.457 8.7 15.2 8.133 13.51H5.758V15.35C6.971 17.761 9.44 19.283 12.14 19.283Z" fill="white" />
    <path d="M8.131 13.51C7.831 12.623 7.831 11.663 8.131 10.776V8.936H5.758C4.746 10.954 4.746 13.332 5.758 15.35L8.131 13.51Z" fill="white" />
    <path d="M12.14 7.826C13.159 7.81 14.143 8.194 14.88 8.897L16.919 6.858C15.628 5.646 13.914 4.979 12.14 5C9.44 5 6.971 6.522 5.758 8.936L8.131 10.776C8.695 9.083 10.277 7.826 12.14 7.826Z" fill="white" />
  </svg>
);

const LiIconWhite = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path fill="white" d="M7.86 7.704V18.5H4.214V7.704H7.86zm.24-3.34c0 1.037-.792 1.867-2.063 1.867h-.023C4.791 6.23 4 5.4 4 4.365 4 3.306 4.815 2.5 6.061 2.5c1.247 0 2.015.806 2.038 1.865zM21 12.31v6.19h-3.644v-5.776c0-1.45-.527-2.44-1.846-2.44-1.007 0-1.606.667-1.87 1.311-.096.231-.12.553-.12.876V18.5H9.876s.048-9.783 0-10.796h3.644v1.53c.484-.735 1.35-1.783 3.285-1.783C19.202 7.45 21 8.994 21 12.31z" />
  </svg>
);

const MailIconBlue = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a91f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const EyeIcon = ({ visible }: { visible: boolean }) => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {visible ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
    ) : (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </>
    )}
  </svg>
);

/* ── Validation ── */
const validate = (field: string, value: string): string | null => {
  if (field === 'email') {
    if (!value.trim()) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.';
  }
  if (field === 'password') {
    if (!value) return 'Password is required.';
  }
  return null;
};

const mapServerMessage = (messages: string | string[]): string => {
  const msg = Array.isArray(messages) ? messages[0] : messages;
  if (!msg || typeof msg !== 'string') return 'This field has an error.';
  const lower = msg.toLowerCase();
  if (lower.includes('credentials') || lower.includes('unauthorized') || lower.includes('invalid'))
    return 'Incorrect email or password. Please double-check and try again.';
  if (lower.includes('not found') || lower.includes('no account'))
    return 'No account found with this email. Did you mean to sign up?';
  if (lower.includes('too many') || lower.includes('rate limit'))
    return 'Too many attempts. Please wait a moment and try again.';
  if (lower.includes('verify')) return 'Please verify your email address before signing in.';
  return msg;
};

const parseResult = (result: any) => {
  if (!result) return { success: false, fieldErrors: {}, globalMessage: 'An unexpected error occurred.' };
  if (result.success) return { success: true, fieldErrors: {}, globalMessage: '' };
  if (result.errors && typeof result.errors === 'object' && !Array.isArray(result.errors)) {
    const fieldErrors: Record<string, string> = {};
    Object.entries(result.errors).forEach(([k, v]) => { fieldErrors[k] = mapServerMessage(v as string | string[]); });
    return { success: false, fieldErrors, globalMessage: '' };
  }
  if (typeof result.errors === 'string') return { success: false, fieldErrors: {}, globalMessage: mapServerMessage(result.errors) };
  return { success: false, fieldErrors: {}, globalMessage: mapServerMessage(result.message || 'Something went wrong.') };
};

/* ── Responsive ── */
const useIsMobile = () => {
  const [mobile, setMobile] = React.useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  React.useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mobile;
};

/* ── Component ── */
interface Props {
  returnTo: string | null;
  onSuccess: (user: any) => void;
}

const LoginForm = ({ returnTo, onSuccess }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [fieldErrors, setFE] = useState<Record<string, string>>({});
  const [globalError, setGE] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const btnBase: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 10, padding: isMobile ? '13px 10px' : '14px 16px',
    border: 'none', borderRadius: 6, cursor: 'pointer',
    fontSize: isMobile ? 14 : 15, fontWeight: 700, width: '100%',
    letterSpacing: '0.01em', transition: 'filter 0.15s',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', border: '1.5px solid #d1d5db',
    borderRadius: 6, fontSize: 15, outline: 'none',
    fontFamily: 'inherit', color: '#1e2532', background: '#fff',
    boxSizing: 'border-box',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    setGE('');
    if (touched[name]) setFE(p => ({ ...p, [name]: validate(name, value) || '' }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(p => ({ ...p, [name]: true }));
    setFE(p => ({ ...p, [name]: validate(name, value) || '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGE('');
    const errors: Record<string, string> = {};
    (['email', 'password'] as const).forEach(f => {
      const err = validate(f, formData[f]);
      if (err) errors[f] = err;
    });
    if (Object.keys(errors).length) {
      setFE(errors);
      setTouched({ email: true, password: true });
      return;
    }
    setLoading(true);
    try {
      const result = await dispatch(loginUser({ email: formData.email, password: formData.password }));
      const parsed = parseResult(result);
      if (parsed.success) {
        onSuccess(result?.user);
      } else {
        if (Object.keys(parsed.fieldErrors).length) {
          setFE(p => ({ ...p, ...parsed.fieldErrors }));
          setTouched(p => ({ ...p, ...Object.fromEntries(Object.keys(parsed.fieldErrors).map(k => [k, true])) }));
        }
        setGE(parsed.globalMessage || '');
      }
    } catch {
      setGE('An unexpected error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleClick = async () => {
    // Fire social login via existing SocialLoginButtons logic
    // For now navigate to Google OAuth — can wire to firebase as needed
    setGE('Google sign-in coming soon.');
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#fff', display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '16px 20px' : '20px 40px',
      }}>
        <Link to={ROUTES.HOME} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 24, fontWeight: 800, color: '#1e2532', lineHeight: 1 }}>resume.io</span>
          <span style={{ fontSize: 11, fontWeight: 500, color: '#828ba2' }}>by Muhammad Nabeel Ijaz</span>
        </Link>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 8, borderRadius: '50%', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: '#9ca3af',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#f3f4f6')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >
          <X size={22} strokeWidth={1.5} />
        </button>
      </header>

      {/* Main */}
      <main style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? '0 24px 48px' : '0 16px 100px',
      }}>
        <div style={{ width: '100%', maxWidth: isMobile ? '100%' : 380 }}>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 36 }}>
            <h1 style={{
              fontSize: isMobile ? 32 : 40, fontWeight: 700, color: '#1e2532',
              letterSpacing: '-0.5px', margin: '0 0 10px 0', lineHeight: 1.1,
            }}>Sign in</h1>
            <p style={{ fontSize: 15, color: '#828ba2', margin: 0, lineHeight: 1.5 }}>
              {returnTo ? 'Sign in to download your resume' : 'We are happy to see you back!'}
            </p>
          </div>

          {globalError && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 6,
              padding: '10px 14px', marginBottom: 16, fontSize: 14, color: '#dc2626',
            }}>{globalError}</div>
          )}

          {!showEmailForm ? (
            <>
              {/* 2×2 social grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                <button style={{ ...btnBase, background: '#1877F2', color: '#fff' }}
                  onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(0.93)')}
                  onMouseLeave={e => (e.currentTarget.style.filter = 'none')}>
                  <FbIconWhite /><span>Facebook</span>
                </button>
                <button style={{ ...btnBase, background: '#EA4335', color: '#fff' }}
                  onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(0.93)')}
                  onMouseLeave={e => (e.currentTarget.style.filter = 'none')}>
                  <GoogleIconWhite /><span>Google</span>
                </button>
                <button style={{ ...btnBase, background: '#2867B2', color: '#fff' }}
                  onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(0.93)')}
                  onMouseLeave={e => (e.currentTarget.style.filter = 'none')}>
                  <LiIconWhite /><span>LinkedIn</span>
                </button>
                <button
                  onClick={() => setShowEmailForm(true)}
                  style={{ ...btnBase, background: '#fff', color: '#1e2532', border: '1.5px solid #d1d5db' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                  <MailIconBlue /><span>Email</span>
                </button>
              </div>

              {/* Footer */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 15, color: '#828ba2', margin: 0 }}>
                  I am not registered —{' '}
                  <Link to={ROUTES.SIGNUP} state={{ from: returnTo }}
                    style={{ color: '#1a91f0', textDecoration: 'none', fontWeight: 500 }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </>
          ) : (
            /* Email/Password form */
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
                  Email address
                </label>
                <input type="email" name="email" value={formData.email}
                  onChange={handleChange} onBlur={handleBlur}
                  autoComplete="email" placeholder="you@example.com"
                  style={{
                    ...inputStyle,
                    borderColor: fieldErrors.email && touched.email ? '#f87171' : '#d1d5db',
                  }} />
                {touched.email && fieldErrors.email && (
                  <p style={{ fontSize: 13, color: '#dc2626', marginTop: 4 }}>{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} name="password" value={formData.password}
                    onChange={handleChange} onBlur={handleBlur}
                    autoComplete="current-password" placeholder="••••••••"
                    style={{
                      ...inputStyle, paddingRight: 40,
                      borderColor: fieldErrors.password && touched.password ? '#f87171' : '#d1d5db',
                    }} />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    style={{
                      position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4,
                    }}>
                    <EyeIcon visible={showPass} />
                  </button>
                </div>
                {touched.password && fieldErrors.password && (
                  <p style={{ fontSize: 13, color: '#dc2626', marginTop: 4 }}>{fieldErrors.password}</p>
                )}
              </div>

              <button type="submit" disabled={loading}
                style={{
                  padding: '13px 16px', background: loading ? '#93c5fd' : '#1a91f0',
                  color: '#fff', border: 'none', borderRadius: 6, fontSize: 15,
                  fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', width: '100%',
                }}>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>

              <button type="button" onClick={() => setShowEmailForm(false)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 14, color: '#828ba2', textAlign: 'center',
                }}>
                ← Back to sign-in options
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoginForm;
