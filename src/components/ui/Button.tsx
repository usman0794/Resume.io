import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'danger' | 'ghost' | 'outline' | 'success';
type Size    = 'md' | 'sm' | 'xs';

interface ButtonProps {
  children:  ReactNode;
  variant?:  Variant;
  size?:     Size;
  to?:       string;
  href?:     string;
  external?: boolean;
  disabled?: boolean;
  loading?:  boolean;
  onClick?:  () => void;
  type?:     'button' | 'submit' | 'reset';
  className?: string;
  style?:    React.CSSProperties;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', to, href, external, disabled, loading, onClick, type = 'button', className = '', style }, ref) => {
    const cls = `btn btn--${variant} btn--${size} ${className}`.trim();

    if (to) {
      return (
        <Link to={to} className={cls} style={style}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}>
          {children}
        </Link>
      );
    }

    if (href) {
      return (
        <a href={href} className={cls} style={style}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} type={type} className={cls} style={style}
        disabled={disabled || loading} onClick={onClick}>
        {loading ? <SpinnerInline /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;

/* Tiny inline spinner for button loading state */
const SpinnerInline = () => (
  <span className="btn-spinner" />
);
