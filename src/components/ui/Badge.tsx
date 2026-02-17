type Variant = 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'neutral';

interface BadgeProps {
  children:   React.ReactNode;
  variant?:   Variant;
  className?: string;
}

const Badge = ({ children, variant = 'neutral', className = '' }: BadgeProps) => (
  <span className={`badge badge--${variant} ${className}`.trim()}>
    {children}
  </span>
);

export default Badge;
