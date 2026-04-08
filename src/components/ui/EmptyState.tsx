import type { ReactNode } from 'react';
import Button from './Button';

interface EmptyStateProps {
  icon:        ReactNode;
  iconBg?:     string;
  iconColor?:  string;
  title:       string;
  sub:         string;
  ctaLabel?:   string;
  ctaTo?:      string;
  ctaVariant?: 'primary' | 'success' | 'danger';
}

const EmptyState = ({
  icon, iconBg = 'var(--clr-primary-bg)', iconColor = 'var(--clr-primary)',
  title, sub, ctaLabel, ctaTo, ctaVariant = 'primary',
}: EmptyStateProps) => (
  <div className="empty-state">
    <div className="empty-state__icon" style={{ background: iconBg, color: iconColor }}>
      {icon}
    </div>
    <p className="empty-state__title">{title}</p>
    <p className="empty-state__sub">{sub}</p>
    {ctaLabel && ctaTo && (
      <Button variant={ctaVariant} to={ctaTo}>
        {ctaLabel}
      </Button>
    )}
  </div>
);

export default EmptyState;
