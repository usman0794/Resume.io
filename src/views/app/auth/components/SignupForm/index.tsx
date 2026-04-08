import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { registerUser, socialLogin } from '@/store/actions/userActions';
import { ROUTES } from '@/routes/routePaths';
import PasswordStrengthBar from '../FormAtoms/PasswordStrengthBar';

/* ── Social Icons ── */
const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#1877F2" />
    <path fill="white" d="M13.73 20.5v-7.514h2.522l.378-2.927h-2.9V8.246c0-.848.235-1.426 1.45-1.426H16.7V4.19A19.4 19.4 0 0 0 14.416 4c-2.23 0-3.756 1.36-3.756 3.86v2.199H8.13v2.927h2.53V20.5h3.07z" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
    <path d="M21 12.306C21 11.82 20.961 11.332 20.877 10.855L14.14 10.855V13.605H17.998C17.838 14.492 17.324 15.276 16.57 15.775V17.56H18.872C20.223 16.316 21 14.479 21 12.306Z" fill="#4285F4" />
    <path d="M14.14 21.283C16.067 21.283 17.691 20.651 18.874 19.559L16.573 17.775C15.933 18.21 15.106 18.457 14.143 18.457C12.28 18.457 10.7 17.2 10.133 15.51H7.758V17.35C8.971 19.761 11.44 21.283 14.14 21.283Z" fill="#34A853" />
    <path d="M10.131 15.51C9.831 14.623 9.831 13.663 10.131 12.776V10.936H7.758C6.746 12.954 6.746 15.332 7.758 17.35L10.131 15.51Z" fill="#FBBC05" />
    <path d="M14.14 9.826C15.159 9.81 16.143 10.194 16.88 10.897L18.919 8.858C17.628 7.646 15.914 6.979 14.14 7C11.44 7 8.971 8.522 7.758 10.936L10.131 12.776C10.695 11.083 12.277 9.826 14.14 9.826Z" fill="#EA4335" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#0A66C2" />
    <path fill="white" d="M8.86 8.204V19H5.214V8.204H8.86zm.24-3.34c0 1.037-.792 1.867-2.063 1.867h-.023C5.791 6.73 5 5.9 5 4.865 5 3.806 5.815 3 7.061 3c1.247 0 2.015.806 2.038 1.865zM20 13.31V19h-3.644v-5.776c0-1.45-.527-2.44-1.846-2.44-1.007 0-1.606.667-1.87 1.311-.096.231-.12.553-.12.876V19H8.876s.048-9.783 0-10.796h3.644v1.53c.484-.735 1.35-1.783 3.285-1.783C18.202 7.95 20 9.494 20 13.31z" />
  </svg>
);

const ChevronArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
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
type FormData = { name: string; email: string; password: string; password_confirmation: string };

const validate = (field: string, value: string, formData: FormData): string | null => {
  switch (field) {
    case 'name':
      if (!value.trim()) return 'Full name is required.';
      if (value.trim().length < 2) return 'Name must be at least 2 characters.';
      return null;
    case 'email':
      if (!value.trim()) return 'Email address is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.';
      return null;
    case 'password':
      if (!value) return 'Password is required.';
      if (value.length < 8) return 'Password must be at least 8 characters.';
      if (!/[A-Z]/.test(value)) return 'Must contain at least one uppercase letter.';
      if (!/[a-z]/.test(value)) return 'Must contain at least one lowercase letter.';
      if (!/[0-9]/.test(value)) return 'Must contain at least one number.';
      return null;
    case 'password_confirmation':
      if (!value) return 'Please confirm your password.';
      if (value !== formData.password) return 'Passwords do not match.';
      return null;
    default:
      return null;
  }
};

const mapServerMessage = (messages: string | string[]): string => {
  const msg = Array.isArray(messages) ? messages[0] : messages;
  if (!msg || typeof msg !== 'string') return 'This field has an error.';
  const lower = msg.toLowerCase();
  if (lower.includes('already been taken') || lower.includes('already exists') || lower.includes('already registered'))
    return 'An account with this email already exists. Try signing in instead.';
  if (lower.includes('too many') || lower.includes('rate limit'))
    return 'Too many attempts. Please wait a moment and try again.';
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

const STEPS = ['Enter your details', 'Choose template', 'Download resume'];

/* ── Component ── */
interface Props {
  returnTo: string | null;
  onSuccess: (user: any) => void;
}

const EMPTY: FormData = { name: '', email: '', password: '', password_confirmation: '' };

const SignupForm = ({ returnTo, onSuccess }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState<FormData>(EMPTY);
  const [fieldErrors, setFE] = useState<Record<string, string>>({});
  const [globalError, setGE] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', border: '1.5px solid #d1d5db',
    borderRadius: 6, fontSize: 15, outline: 'none',
    fontFamily: 'inherit', color: '#1e2532', background: '#fff',
    boxSizing: 'border-box',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const next = { ...formData, [name]: value };
    setFormData(next);
    setGE('');
    if (touched[name]) setFE(p => ({ ...p, [name]: validate(name, value, next) || '' }));
    if (name === 'password' && touched.password_confirmation) {
      const confirmErr = next.password_confirmation && value !== next.password_confirmation
        ? 'Passwords do not match.' : '';
      setFE(p => ({ ...p, password_confirmation: confirmErr }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(p => ({ ...p, [name]: true }));
    setFE(p => ({ ...p, [name]: validate(name, value, formData) || '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGE('');
    const errors: Record<string, string> = {};
    (['name', 'email', 'password', 'password_confirmation'] as const).forEach(f => {
      const err = validate(f, formData[f], formData);
      if (err) errors[f] = err;
    });
    if (Object.keys(errors).length) {
      setFE(errors);
      setTouched({ name: true, email: true, password: true, password_confirmation: true });
      return;
    }
    setLoading(true);
    try {
      const result = await dispatch(registerUser(formData));
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

  return (
    <div style={{
      minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '16px 20px' : '20px 40px',
        position: 'relative', zIndex: 10,
      }}>
        <Link to={ROUTES.HOME} style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#1e2532' }}>resume.io</span>
        </Link>

        {/* Stepper — desktop only */}
        {!isMobile && (
          <div style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            {STEPS.map((label, i) => (
              <React.Fragment key={label}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: i === 0 ? '#1a91f0' : '#e5e7eb',
                    color: i === 0 ? '#fff' : '#9ca3af',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, flexShrink: 0, lineHeight: 1,
                  }}>{i + 1}</div>
                  <span style={{
                    fontSize: 14, fontWeight: i === 0 ? 500 : 400,
                    color: i === 0 ? '#1e2532' : '#9ca3af', whiteSpace: 'nowrap',
                  }}>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 40, height: 1, background: '#e5e7eb', flexShrink: 0 }} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      {/* Main */}
      <main style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: isMobile ? 'stretch' : 'center',
        padding: isMobile ? '0 20px 40px' : '32px 40px 80px',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{ width: '100%', maxWidth: isMobile ? '100%' : 420 }}>

          {!showEmailForm ? (
            <>
              <h1 style={{
                fontSize: isMobile ? 28 : 40, fontWeight: 700, color: '#1a91f0',
                lineHeight: 1.2, margin: '0 0 12px 0', letterSpacing: '-0.5px',
              }}>Connect your social profile</h1>
              <p style={{ fontSize: 15, color: '#374151', margin: '0 0 28px 0', lineHeight: 1.5 }}>
                Prefill your resume with data from your social profile
              </p>

              {globalError && (
                <div style={{
                  background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 6,
                  padding: '10px 14px', marginBottom: 16, fontSize: 14, color: '#dc2626',
                }}>{globalError}</div>
              )}

              {/* Social list */}
              <div style={{ background: '#f4f6f8', borderRadius: 8, overflow: 'hidden', marginBottom: 32 }}>
                {[
                  { key: 'facebook', Icon: FacebookIcon, label: 'Facebook' },
                  { key: 'google', Icon: GoogleIcon, label: 'Google' },
                  { key: 'linkedin', Icon: LinkedInIcon, label: 'LinkedIn' },
                ].map((item, i, arr) => (
                  <button key={item.key}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '17px 22px', textDecoration: 'none', background: 'white',
                      borderBottom: i < arr.length - 1 ? '1px solid #f4f6f8' : 'none',
                      cursor: 'pointer', width: '100%', border: 'none',
                      borderBottomWidth: i < arr.length - 1 ? 1 : 0,
                      borderBottomStyle: 'solid', borderBottomColor: '#f4f6f8',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <item.Icon />
                      <span style={{ fontSize: 15, fontWeight: 500, color: '#1e2532' }}>{item.label}</span>
                    </div>
                    <ChevronArrow />
                  </button>
                ))}
              </div>

              {/* Email option + nav */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => navigate(-1)}
                  style={{
                    padding: '11px 36px', fontSize: 15, fontWeight: 600, color: '#1e2532',
                    background: '#fff', border: '1.5px solid #d1d5db', borderRadius: 4,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                  Back
                </button>
                <button onClick={() => setShowEmailForm(true)}
                  style={{
                    padding: '11px 40px', fontSize: 15, fontWeight: 600, color: '#fff',
                    background: '#1a91f0', border: 'none', borderRadius: 4, cursor: 'pointer',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#1279cc')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#1a91f0')}>
                  Email
                </button>
              </div>

              <p style={{ textAlign: 'center', fontSize: 14, color: '#828ba2', marginTop: 20 }}>
                Already have an account?{' '}
                <Link to={ROUTES.LOGIN} state={{ from: returnTo }}
                  style={{ color: '#1a91f0', textDecoration: 'none', fontWeight: 500 }}>
                  Sign in
                </Link>
              </p>
            </>
          ) : (
            <>
              <h1 style={{
                fontSize: isMobile ? 28 : 36, fontWeight: 700, color: '#1e2532',
                lineHeight: 1.2, margin: '0 0 8px 0', letterSpacing: '-0.5px',
              }}>Create your account</h1>
              <p style={{ fontSize: 15, color: '#828ba2', margin: '0 0 24px 0' }}>
                {returnTo ? 'Sign up to download your resume' : 'Fill in your details below'}
              </p>

              {globalError && (
                <div style={{
                  background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 6,
                  padding: '10px 14px', marginBottom: 16, fontSize: 14, color: '#dc2626',
                }}>{globalError}</div>
              )}

              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {([
                  { name: 'name', label: 'Full name', type: 'text', placeholder: 'Your Name', autocomplete: 'name' },
                  { name: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com', autocomplete: 'email' },
                ] as const).map(({ name, label, type, placeholder, autocomplete }) => (
                  <div key={name}>
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
                      {label}
                    </label>
                    <input type={type} name={name} value={formData[name as keyof FormData]}
                      onChange={handleChange} onBlur={handleBlur}
                      autoComplete={autocomplete} placeholder={placeholder}
                      style={{
                        ...inputStyle,
                        borderColor: fieldErrors[name] && touched[name] ? '#f87171' : '#d1d5db',
                      }} />
                    {touched[name] && fieldErrors[name] && (
                      <p style={{ fontSize: 13, color: '#dc2626', marginTop: 4 }}>{fieldErrors[name]}</p>
                    )}
                  </div>
                ))}

                {/* Password */}
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input type={showPass ? 'text' : 'password'} name="password" value={formData.password}
                      onChange={handleChange} onBlur={handleBlur}
                      autoComplete="new-password" placeholder="••••••••"
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
                  {formData.password && <PasswordStrengthBar password={formData.password} />}
                  {!fieldErrors.password && (
                    <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>8+ chars, uppercase, lowercase & number.</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input type={showConfirm ? 'text' : 'password'} name="password_confirmation" value={formData.password_confirmation}
                      onChange={handleChange} onBlur={handleBlur}
                      autoComplete="new-password" placeholder="••••••••"
                      style={{
                        ...inputStyle, paddingRight: 40,
                        borderColor: fieldErrors.password_confirmation && touched.password_confirmation ? '#f87171' : '#d1d5db',
                      }} />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      style={{
                        position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                        background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4,
                      }}>
                      <EyeIcon visible={showConfirm} />
                    </button>
                  </div>
                  {touched.password_confirmation && fieldErrors.password_confirmation && (
                    <p style={{ fontSize: 13, color: '#dc2626', marginTop: 4 }}>{fieldErrors.password_confirmation}</p>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  <button type="button" onClick={() => setShowEmailForm(false)}
                    style={{
                      flex: 1, padding: '12px 16px', fontSize: 15, fontWeight: 600,
                      color: '#1e2532', background: '#fff', border: '1.5px solid #d1d5db',
                      borderRadius: 4, cursor: 'pointer',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                    Back
                  </button>
                  <button type="submit" disabled={loading}
                    style={{
                      flex: 2, padding: '12px 16px', background: loading ? '#93c5fd' : '#1a91f0',
                      color: '#fff', border: 'none', borderRadius: 4, fontSize: 15,
                      fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                    }}>
                    {loading ? 'Creating...' : 'Create account'}
                  </button>
                </div>
              </form>

              <p style={{ textAlign: 'center', fontSize: 14, color: '#828ba2', marginTop: 20 }}>
                Already have an account?{' '}
                <Link to={ROUTES.LOGIN} state={{ from: returnTo }}
                  style={{ color: '#1a91f0', textDecoration: 'none', fontWeight: 500 }}>
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default SignupForm;
