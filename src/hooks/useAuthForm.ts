import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser, registerUser, socialLogin } from '@/store/actions/userActions';
import type { AppDispatch } from '@/store';
import { ROUTES } from '@/routes/routePaths';

interface FormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

type FieldErrors = Partial<Record<keyof FormData, string>>;

const VALIDATIONS: Record<string, (v: string, fd?: FormData) => string | null> = {
  name: (v) => {
    if (!v.trim()) return 'Full name is required.';
    if (v.trim().length < 2) return 'Name must be at least 2 characters.';
    if (v.trim().length > 50) return 'Name must be under 50 characters.';
    if (!/^[a-zA-Z\s'-]+$/.test(v.trim())) return 'Name can only contain letters, spaces, hyphens, and apostrophes.';
    return null;
  },
  email: (v) => {
    if (!v.trim()) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email address.';
    return null;
  },
  password_login: (v) => (!v ? 'Password is required.' : null),
  password_register: (v) => {
    if (!v) return 'Password is required.';
    if (v.length < 8) return 'Password must be at least 8 characters long.';
    if (!/[A-Z]/.test(v)) return 'Password must contain at least one uppercase letter.';
    if (!/[a-z]/.test(v)) return 'Password must contain at least one lowercase letter.';
    if (!/[0-9]/.test(v)) return 'Password must contain at least one number.';
    return null;
  },
  password_confirmation: (v, fd) => {
    if (!v) return 'Please confirm your password.';
    if (v !== fd?.password) return 'Passwords do not match. Please try again.';
    return null;
  },
};

const mapServerMessage = (messages: string | string[]): string => {
  const msg = Array.isArray(messages) ? messages[0] : messages;
  if (!msg || typeof msg !== 'string') return 'This field has an error.';
  const lower = msg.toLowerCase();
  if (lower.includes('already been taken') || lower.includes('already exists')) return 'An account with this email already exists.';
  if (lower.includes('credentials') || lower.includes('unauthorized') || lower.includes('invalid')) return 'Incorrect email or password.';
  if (lower.includes('not found') || lower.includes('no account')) return 'No account found with this email.';
  if (lower.includes('too many') || lower.includes('throttle')) return 'Too many attempts. Please wait and try again.';
  if (lower.includes('verify')) return 'Please verify your email before signing in.';
  if (lower.includes('disabled') || lower.includes('suspended')) return 'Your account has been suspended. Contact support.';
  return msg;
};

interface ParsedResult {
  success: boolean;
  fieldErrors: FieldErrors;
  globalMessage: string;
}

const parseActionResult = (result: any): ParsedResult => {
  if (!result) return { success: false, fieldErrors: {}, globalMessage: 'An unexpected error occurred.' };
  if (result.success) return { success: true, fieldErrors: {}, globalMessage: '' };
  if (result.errors && typeof result.errors === 'object' && !Array.isArray(result.errors)) {
    const fieldErrors: FieldErrors = {};
    Object.entries(result.errors).forEach(([key, msgs]) => {
      fieldErrors[key as keyof FormData] = mapServerMessage(msgs as string[]);
    });
    return { success: false, fieldErrors, globalMessage: '' };
  }
  if (typeof result.errors === 'string') return { success: false, fieldErrors: {}, globalMessage: mapServerMessage(result.errors) };
  const msg = result.message || 'Something went wrong. Please try again.';
  return { success: false, fieldErrors: {}, globalMessage: mapServerMessage(msg) };
};

export interface PasswordStrength {
  label: string;
  color: string;
  width: string;
  textColor: string;
}

export const getPasswordStrength = (password: string): PasswordStrength | null => {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return { label: 'Weak', color: 'bg-red-400', width: 'w-1/4', textColor: 'text-red-500' };
  if (score === 3) return { label: 'Fair', color: 'bg-yellow-400', width: 'w-2/4', textColor: 'text-yellow-500' };
  if (score === 4) return { label: 'Good', color: 'bg-blue-400', width: 'w-3/4', textColor: 'text-blue-500' };
  return { label: 'Strong', color: 'bg-green-500', width: 'w-full', textColor: 'text-green-600' };
};

interface UseAuthFormReturn {
  formData: FormData;
  fieldErrors: FieldErrors;
  globalError: string;
  loading: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  touched: Partial<Record<keyof FormData, boolean>>;
  passwordStrength: PasswordStrength | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleSocialLogin: (providerFn: () => Promise<{ idToken: string }>, providerName: string) => Promise<void>;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
}

export function useAuthForm(isLogin: boolean): UseAuthFormReturn {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = (location.state as { from?: string })?.from ?? null;

  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '', password_confirmation: '' });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const passwordStrength = getPasswordStrength(formData.password);

  const validateField = (name: string, value: string): string | null => {
    const key = name === 'password' ? (isLogin ? 'password_login' : 'password_register') : name;
    return VALIDATIONS[key]?.(value, formData) ?? null;
  };

  const redirectAfterAuth = (user: any) => {
    if (returnTo) { navigate(returnTo, { replace: true }); return; }
    navigate(user?.role === 'admin' ? ROUTES.ADMIN_DASHBOARD : ROUTES.DASHBOARD, { replace: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setGlobalError('');
    if (touched[name as keyof FormData]) {
      const err = validateField(name, value);
      setFieldErrors((prev) => ({ ...prev, [name]: err ?? '' }));
    }
    if (name === 'password' && touched.password_confirmation) {
      const confirmErr = formData.password_confirmation && value !== formData.password_confirmation
        ? 'Passwords do not match.' : '';
      setFieldErrors((prev) => ({ ...prev, password_confirmation: confirmErr }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: err ?? '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError('');
    const fields = isLogin ? ['email', 'password'] : ['name', 'email', 'password', 'password_confirmation'];
    const clientErrors: FieldErrors = {};
    fields.forEach((f) => {
      const err = validateField(f, formData[f as keyof FormData]);
      if (err) clientErrors[f as keyof FormData] = err;
    });
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setTouched((prev) => ({ ...prev, ...Object.fromEntries(Object.keys(clientErrors).map((k) => [k, true])) }));
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        const result = await dispatch(loginUser({ email: formData.email, password: formData.password }));
        const parsed = parseActionResult(result);
        parsed.success ? redirectAfterAuth(result?.user) : (setFieldErrors(parsed.fieldErrors), setGlobalError(parsed.globalMessage));
      } else {
        const result = await dispatch(registerUser({ name: formData.name, email: formData.email, password: formData.password, password_confirmation: formData.password_confirmation }));
        const parsed = parseActionResult(result);
        parsed.success ? redirectAfterAuth(result?.user) : (setFieldErrors(parsed.fieldErrors), setGlobalError(parsed.globalMessage));
      }
    } catch {
      setGlobalError('An unexpected error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = useCallback(async (providerFn: () => Promise<{ idToken: string }>, providerName: string) => {
    setLoading(true);
    setGlobalError('');
    try {
      const { idToken } = await providerFn();
      const result = await dispatch(socialLogin(idToken, providerName));
      const parsed = parseActionResult(result);
      parsed.success ? redirectAfterAuth(result?.user) : setGlobalError(parsed.globalMessage || `${providerName} sign-in failed.`);
    } catch (err: any) {
      const firebaseErrors: Record<string, string> = {
        'auth/popup-closed-by-user': 'Sign-in window was closed. Please try again.',
        'auth/cancelled-popup-request': 'Sign-in cancelled. Please try again.',
        'auth/network-request-failed': 'Network error. Please check your connection.',
      };
      setGlobalError(firebaseErrors[err?.code] ?? `${providerName} sign-in failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLogin, returnTo]);

  return {
    formData, fieldErrors, globalError, loading,
    showPassword, showConfirmPassword, touched, passwordStrength,
    handleChange, handleBlur, handleSubmit, handleSocialLogin,
    toggleShowPassword: () => setShowPassword((v) => !v),
    toggleShowConfirmPassword: () => setShowConfirmPassword((v) => !v),
  };
}

export default useAuthForm;
