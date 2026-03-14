import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';
import { useDashboardData } from '@/hooks/useDashboardData';
import { SHIMMER_KEYFRAMES, shimmerStyle } from '@/components/shared/Shimmer';
import DocumentsPageHeader from './components/DocumentsPageHeader';
import DocumentsTabs from './components/DocumentsTabs';
import ResumeDistributionBanner from './components/ResumeDistributionBanner';
import ResumeGrid from './components/ResumeGrid';
import type { ResumeData } from './components/ResumeGrid';
import AiCoachBar from './components/AiCoachBar';
import './resumes.css';

const ResumesPage: React.FC = () => {
  const navigate = useNavigate();
  const { resumes: apiResumes, loading, deleteResume, refresh } = useDashboardData();

  // Map backend Resume → ResumeGrid's ResumeData shape
  const resumes: ResumeData[] = apiResumes.map((r) => ({
    id: String(r.id),
    title: (r as any).title || 'Untitled',
    updatedAt: r.updated_at
      ? new Date(r.updated_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      : '—',
    score: (r as any).score ?? 0,
    thumbnailUrl: (r as any).thumbnail_url ?? undefined,
  }));

  const handleCreateNew = () => navigate(ROUTES.RESUME_BUILDER);
  const handleStartNow  = () => navigate(ROUTES.APP_RESUME_DISTRIBUTION);
  const handleAiCoach   = (question: string) => console.log('[ResumesPage] AI coach:', question);

  const handleDeleteResume = async (id: string) => {
    await deleteResume(Number(id));
  };

  if (loading && resumes.length === 0) {
    return (
      <div className="rp-page">
        <style>{SHIMMER_KEYFRAMES}</style>
        <DocumentsPageHeader onCreateNew={handleCreateNew} />
        <DocumentsTabs activeTab="resumes" />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} style={{ borderRadius: 16, padding: 24, border: '1px solid #f1f3f5', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
              {/* Thumbnail */}
              <div style={{ width: '100%', height: 120, borderRadius: 10, ...shimmerStyle }} />
              {/* Title */}
              <div style={{ width: '55%', height: 20, borderRadius: 6, ...shimmerStyle }} />
              {/* Meta row */}
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 80, height: 14, borderRadius: 5, ...shimmerStyle }} />
                <div style={{ width: 60, height: 14, borderRadius: 5, ...shimmerStyle }} />
              </div>
              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <div style={{ width: 90, height: 34, borderRadius: 8, ...shimmerStyle }} />
                <div style={{ width: 90, height: 34, borderRadius: 8, ...shimmerStyle }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rp-page">
      <DocumentsPageHeader onCreateNew={handleCreateNew} />
      <DocumentsTabs activeTab="resumes" />

      <div className="rp-mobile-new-wrap md:hidden mb-4">
        <button type="button" className="rp-mobile-new-btn w-full" onClick={handleCreateNew}>
          + New Resume
        </button>
      </div>

      <ResumeDistributionBanner onStartNow={handleStartNow} />

      <ResumeGrid
        resumes={resumes}
        onCreateNew={handleCreateNew}
        onDelete={handleDeleteResume}
      />

      <AiCoachBar onSubmit={handleAiCoach} />
    </div>
  );
};

export default ResumesPage;
