/**
 * Component: JobPreferencesSection
 *
 * Purpose:
 *   "Your job preferences" form section — where the user works and what they do.
 *   Contains country select, state input, remote toggle, industry dropdown,
 *   salary (currency + amount + period), recruiters matched count, and CTA.
 *
 * Responsibilities:
 *   - Section heading + subtitle
 *   - Country dropdown + State text input (side by side on desktop/tablet)
 *   - "Open to remote opportunities" toggle switch
 *   - Industry searchable dropdown (decorative chevron)
 *   - Salary row: Currency dropdown + $ amount input + Period dropdown
 *   - "Recruiters Matched: 1000+" box
 *   - "Start Distributing" full-width CTA button
 *   - Lift state changes via onChange / onToggleRemote
 *
 * Responsive Behavior:
 *   - Desktop/Tablet (≥640px): Country + State side by side; salary 3-col row
 *   - Mobile (<640px): all stacked; salary still inline 3-col compressed
 *
 * Design Intent:
 *   Section heading: 16px 700 #111827. Subtitle: 13px #6b7280.
 *   Selects: bg #f3f4f6, 46px, radius 8px, chevron icon right.
 *   Toggle: 40px×22px pill, bg gray → #1a91f0 when active.
 *   Recruiters box: bg #f8faff, border 1px #e5e7eb, radius 8px, "1000+" in #1a91f0 24px 700.
 *   Start Distributing: full-width, #1a91f0, 48px, radius 10px, 16px 600 white.
 */

import React from 'react';

interface JobPrefValues {
  country        : string;
  state          : string;
  openToRemote   : boolean;
  industry       : string;
  currency       : string;
  salaryAmount   : string;
  salaryPeriod   : string;
}

interface JobPreferencesSectionProps {
  values        : JobPrefValues;
  onChange      : (field: keyof JobPrefValues, value: string | boolean) => void;
  onSubmit      : () => void;
}

const ChevronIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const HelpIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const JobPreferencesSection: React.FC<JobPreferencesSectionProps> = ({ values, onChange, onSubmit }) => (
  <section className="rdc-section">
    <h2 className="rdc-section-heading">Your job preferences</h2>
    <p  className="rdc-section-sub">Choose where you want to work, and what you want to do.</p>

    {/* Country + State */}
    <div className="rdc-row-two">
      <div className="rdc-field-group">
        <label className="rdc-label" htmlFor="rd-country">Country</label>
        <div className="rdc-select-wrap">
          <select
            id       ="rd-country"
            className="rdc-select"
            value    ={values.country}
            onChange ={(e) => onChange('country', e.target.value)}
          >
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Germany">Germany</option>
          </select>
          <span className="rdc-select-chevron"><ChevronIcon /></span>
        </div>
      </div>
      <div className="rdc-field-group">
        <label className="rdc-label" htmlFor="rd-state">State</label>
        <input
          id          ="rd-state"
          type        ="text"
          className   ="rdc-input"
          placeholder ="E.g. California (CA)"
          value       ={values.state}
          onChange    ={(e) => onChange('state', e.target.value)}
          autoComplete="off"
        />
      </div>
    </div>

    {/* Remote toggle */}
    <div className="rdc-toggle-row">
      <button
        type           ="button"
        role           ="switch"
        aria-checked   ={values.openToRemote}
        className      ={`rdc-toggle${values.openToRemote ? ' rdc-toggle--on' : ''}`}
        onClick        ={() => onChange('openToRemote', !values.openToRemote)}
        aria-label     ="Open to remote opportunities"
      >
        <span className="rdc-toggle-thumb" />
      </button>
      <span className="rdc-toggle-label">Open to remote opportunities</span>
    </div>

    {/* Industry */}
    <div className="rdc-field-group">
      <label className="rdc-label" htmlFor="rd-industry">Industry</label>
      <div className="rdc-select-wrap">
        <input
          id          ="rd-industry"
          type        ="text"
          className   ="rdc-input rdc-input--icon-right"
          placeholder ="Enter your industry name"
          value       ={values.industry}
          onChange    ={(e) => onChange('industry', e.target.value)}
          autoComplete="off"
        />
        <span className="rdc-select-chevron rdc-select-chevron--over-input"><ChevronIcon /></span>
      </div>
    </div>

    {/* Salary row */}
    <div className="rdc-salary-row">
      {/* Currency */}
      <div className="rdc-salary-currency rdc-select-wrap">
        <select
          className="rdc-select rdc-select--salary"
          value    ={values.currency}
          onChange ={(e) => onChange('currency', e.target.value)}
          aria-label="Currency"
        >
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="AUD">AUD</option>
        </select>
        <span className="rdc-select-chevron"><ChevronIcon /></span>
      </div>

      {/* Amount */}
      <div className="rdc-salary-amount">
        <span className="rdc-salary-dollar">$</span>
        <input
          type        ="text"
          className   ="rdc-input rdc-input--salary-amount"
          placeholder ="100,000"
          value       ={values.salaryAmount}
          onChange    ={(e) => onChange('salaryAmount', e.target.value)}
          aria-label  ="Salary amount"
        />
      </div>

      {/* Period */}
      <div className="rdc-salary-period rdc-select-wrap">
        <select
          className="rdc-select rdc-select--salary"
          value    ={values.salaryPeriod}
          onChange ={(e) => onChange('salaryPeriod', e.target.value)}
          aria-label="Salary period"
        >
          <option value="Annually">Annually</option>
          <option value="Monthly">Monthly</option>
          <option value="Hourly">Hourly</option>
        </select>
        <span className="rdc-select-chevron"><ChevronIcon /></span>
      </div>
    </div>

    {/* Recruiters matched */}
    <div className="rdc-recruiters-box">
      <span className="rdc-recruiters-label">Recruiters Matched</span>
      <div className="rdc-recruiters-count">
        <span className="rdc-recruiters-number">1000+</span>
        <button type="button" className="rdc-recruiters-help" aria-label="What does this mean?">
          <HelpIcon />
        </button>
      </div>
    </div>

    {/* CTA */}
    <button
      type     ="button"
      className="rdc-submit-btn"
      onClick  ={onSubmit}
    >
      Start Distributing
    </button>
  </section>
);

export default JobPreferencesSection;
