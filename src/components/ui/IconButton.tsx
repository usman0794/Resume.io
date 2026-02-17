import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IconButtonProps {
  children:   ReactNode;
  variant?:   'default' | 'danger';
  to?:        string;
  href?:      string;
  external?:  boolean;
  onClick?:   () => void;
  title?:     string;
  disabled?:  boolean;
  className?: string;
}

const IconButton = ({
  children, variant = 'default', to, href, external,
  onClick, title, disabled, className = '',
}: IconButtonProps) => {
  const cls = `icon-btn ${variant === 'danger' ? 'icon-btn--danger' : ''} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={cls} title={title}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls} title={title}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} title={title}
      disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
