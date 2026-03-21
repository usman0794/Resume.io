/**
 * View: ResumeDistributionPage  (src/views/app/resume-distribution/index.ts)
 *
 * Purpose:
 *   Resume Distribution Questionnaire page — pixel-perfect clone of
 *   resume.io "/app/resume-distribution/edit" screen.
 *
 * Responsibilities:
 *   - Page heading "Resume Distribution Questionnaire"
 *   - ResumeCard (selected resume + buttons)
 *   - CountriesNotice banner
 *   - PersonalInfoSection (name, job title, location, email)
 *   - JobPreferencesSection (country, state, remote, industry, salary, CTA)
 *   - Desktop-only RecruitersPanel (right column)
 *   - Orchestrate all form state
 *
 * Responsive Behavior:
 *   - Mobile (<640px): single column, full-width, stacked
 *   - Tablet (640–1023px): single column, wider form (no right panel)
 *   - Desktop (≥1024px): two columns — form left ~58%, recruiters panel right ~42%
 *
 * Layout Role:
 *   Rendered inside AppLayout's main scrollable area.
 *   All styles in ./resume-distribution.css (.rdc-*)
 *
 * Design Intent:
 *   White page background. Page heading 22px 700 #111827.
 *   Left form column max-width ~560px on desktop.
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/rootReducer';
import './resume-distribution.css';
import ResumeCard from './components/ResumeCard';
import CountriesNotice from './components/CountriesNotice';
import PersonalInfoSection from './components/PersonalInfoSection';
import JobPreferencesSection from './components/JobPreferencesSection';
import RecruitersPanel from './components/RecruitersPanel';

const ResumeDistributionPage: React.FC = () => {
  const user = useSelector((s: RootState) => s.userReducer.user);
  const nameParts = user?.name?.trim().split(' ') ?? [];

  /* ── Personal info state ── */
  const [personalInfo, setPersonalInfo] = useState({
    firstName: nameParts[0] ?? '',
    lastName: nameParts.slice(1).join(' ') ?? '',
    jobTitle: '',
    currentLocation: '',
    email: user?.email ?? '',
  });

  /* ── Job preferences state ── */
  const [jobPrefs, setJobPrefs] = useState({
    country: 'United States',
    state: '',
    openToRemote: false,
    industry: '',
    currency: 'USD',
    salaryAmount: '',
    salaryPeriod: 'Annually',
  });

  const handlePersonalChange = (field: keyof typeof personalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleJobPrefChange = (field: keyof typeof jobPrefs, value: string | boolean) => {
    setJobPrefs(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('[ResumeDistribution] Start Distributing', { personalInfo, jobPrefs });
  };

  return (
    <div className="rdc-root">
      {/* ── Left: questionnaire form ── */}
      <div className="rdc-left">
        <h1 className="rdc-page-heading">Resume Distribution Questionnaire</h1>

        <ResumeCard
          title="Untitled"
          updatedAt="Updated 24 May, 02:33"
          onPreview={() => console.log('preview')}
          onChangeResume={() => console.log('change resume')}
        />

        <CountriesNotice />

        <PersonalInfoSection
          values={personalInfo}
          onChange={handlePersonalChange}
        />

        <JobPreferencesSection
          values={jobPrefs}
          onChange={handleJobPrefChange}
          onSubmit={handleSubmit}
        />
      </div>

      {/* ── Right: recruiters panel (desktop only) ── */}
      <div className="rdc-right" aria-hidden="true">
        <RecruitersPanel />
      </div>
    </div>
  );
};

export default ResumeDistributionPage;
