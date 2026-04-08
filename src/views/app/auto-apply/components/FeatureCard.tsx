/**
 * Component: FeatureCard
 *
 * Purpose:
 *   A single feature highlight tile used in the 4-feature grid below
 *   the hero card on the Auto Apply page.
 *
 * Responsibilities:
 *   - Render a colorful emoji/illustration icon (32×32 visual block)
 *   - Render feature title (bold, 15px)
 *   - Render feature body copy (13px gray)
 *   - Top border separator between cards (visible on desktop grid layout)
 *
 * Responsive Behavior:
 *   - Desktop: 4-column horizontal grid, each cell ~260px
 *   - Tablet: 2×2 grid
 *   - Mobile: 2×2 grid (narrower)
 *
 * Design Intent:
 *   No card background — cells sit on white page bg separated by
 *   thin #e5e7eb top border. 24px top padding. Icon 40px square.
 *   Title: 15px 700 #111827. Body: 13px #6b7280, line-height 1.5.
 */

import React from 'react';

export interface FeatureCardData {
  id         : string;
  iconEmoji  : string;   // emoji or short text used as icon
  iconElement?: React.ReactNode; // optional SVG/JSX icon override
  title      : string;
  body       : string;
}

interface FeatureCardProps {
  feature: FeatureCardData;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => (
  <div className="aaf-card">
    {/* Icon */}
    <div className="aaf-icon" aria-hidden="true">
      {feature.iconElement ?? (
        <span className="aaf-emoji">{feature.iconEmoji}</span>
      )}
    </div>

    {/* Text */}
    <h3 className="aaf-title">{feature.title}</h3>
    <p  className="aaf-body" >{feature.body}</p>
  </div>
);

export default FeatureCard;
