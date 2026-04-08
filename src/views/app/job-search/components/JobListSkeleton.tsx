/**
 * Component: JobListSkeleton
 *
 * Purpose:
 *   Displays shimmer-animated placeholder cards while job data loads.
 *
 * Responsibilities:
 *   - Renders N skeleton rows (default 5)
 *   - Each row mirrors JobCard layout: logo placeholder + text lines
 *
 * Design Intent:
 *   Light gray shimmer animation, matching card dimensions.
 *   Prevents layout shift when real cards appear.
 */

import React from 'react';

interface JobListSkeletonProps {
  count?: number;
}

const SkeletonCard: React.FC = () => (
  <div className="jsk-card" aria-hidden="true">
    <div className="jsk-logo jsk-pulse" />
    <div className="jsk-body">
      <div className="jsk-line jsk-line-title jsk-pulse" />
      <div className="jsk-line jsk-line-company jsk-pulse" />
      <div className="jsk-line jsk-line-meta jsk-pulse" />
    </div>
  </div>
);

const JobListSkeleton: React.FC<JobListSkeletonProps> = ({ count = 5 }) => (
  <div className="jsk-list" role="status" aria-label="Loading jobs…">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default JobListSkeleton;
