/**
 * Component: CountriesNotice
 *
 * Purpose:
 *   Informational banner listing the countries where Resume Distribution
 *   is currently supported. Matches the blue info box in the reference.
 *
 * Responsibilities:
 *   - Render blue info (ℹ) icon
 *   - Render notice text with bold country names
 *
 * Design Intent:
 *   Bg: #eff6ff. Border: 1px #bfdbfe. Radius: 8px. Padding: 14px 16px.
 *   Icon: #3b82f6 circle-i, 16px. Text: 13px #374151, line-height 1.6.
 *   Country names bold: #111827.
 */

import React from 'react';

const InfoIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#3b82f6" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#3b82f6" opacity="0.15"/>
    <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="1.5" fill="none"/>
    <line x1="12" y1="8" x2="12" y2="8" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="12" y1="11" x2="12" y2="17" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CountriesNotice: React.FC = () => (
  <div className="rdc-notice" role="note">
    <span className="rdc-notice-icon"><InfoIcon /></span>
    <p className="rdc-notice-text">
      At the moment, Resume Distribution only works in the{' '}
      <strong>United States</strong>,{' '}
      <strong>United Kingdom</strong>,{' '}
      <strong>Canada</strong>,{' '}
      <strong>Australia</strong>,{' '}
      <strong>the Netherlands</strong>{' '}
      and <strong>Germany</strong>.
    </p>
  </div>
);

export default CountriesNotice;
