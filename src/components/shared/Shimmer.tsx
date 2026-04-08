/**
 * Shared shimmer skeleton utility — single source of truth.
 * Used by any component that needs a loading placeholder.
 *
 * Usage:
 *   import { shimmerStyle, ShimmerBlock, SHIMMER_KEYFRAMES } from '@/components/shared/Shimmer';
 *
 *   // Inline style approach:
 *   <div style={{ width: '100%', height: 200, borderRadius: 8, ...shimmerStyle }} />
 *
 *   // Component approach:
 *   <ShimmerBlock w="100%" h={200} r={8} />
 *
 *   // Always inject keyframes once per page:
 *   <style>{SHIMMER_KEYFRAMES}</style>
 */
import React from 'react';

export const SHIMMER_KEYFRAMES = `@keyframes skshimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`;

export const shimmerStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)',
  backgroundSize: '200% 100%',
  animation: 'skshimmer 1.4s infinite',
  flexShrink: 0,
};

interface ShimmerBlockProps {
  w?: string | number;
  h?: string | number;
  r?: string | number;
  mb?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export const ShimmerBlock: React.FC<ShimmerBlockProps> = ({
  w = '100%', h = 16, r = 8, mb = 0, className, style
}) => (
  <div
    className={className}
    style={{
      width: w,
      height: h,
      borderRadius: r,
      marginBottom: mb,
      ...shimmerStyle,
      ...style,
    }}
  />
);

export default ShimmerBlock;
