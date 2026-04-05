import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value?: number | string; // Made optional to match the undefined check
  bg?: string;
  iconColor?: string;
  to?: string;
}

const StatsCard = ({ icon, label, value, bg, iconColor, to }: StatsCardProps) => {
  // Extracted styles into a clean object
  const cardStyle = {
    background: bg,
    boxShadow: '0 2px 0 rgba(90, 97, 105, .11), 0 4px 8px rgba(90, 97, 105, .12), 0 10px 10px rgba(90, 97, 105, .06), 0 7px 70px rgba(90, 97, 105, .1)',
  };

  const cardContent = (
    <div className="stat-card" style={cardStyle}>
      <div className="stat-card__icon-box" style={{ color: iconColor }}>
        {icon}
      </div>
      <div className="stat-card__details">
        <p className="stat-card__value">{value ?? '—'}</p>
        <p className="stat-card__label">{label}</p>
      </div>
    </div>
  );

  // Return wrapped in a Link if 'to' is provided, otherwise just the card
  return to ? (
    <Link to={to} className="stat-card-link">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default StatsCard;