import React from 'react';

/** Single shimmer block — drop-in replacement for any loading placeholder */
export const Sk: React.FC<{
  w?: string | number;
  h?: string | number;
  r?: number | string;
  style?: React.CSSProperties;
  className?: string;
}> = ({ w = '100%', h = 16, r = 8, style, className }) => (
  <div
    className={className}
    style={{
      width: w,
      height: h,
      borderRadius: r,
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'skshimmer 1.4s infinite',
      flexShrink: 0,
      ...style,
    }}
  />
);

export const SkShimmerStyle = `
  @keyframes skshimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;
