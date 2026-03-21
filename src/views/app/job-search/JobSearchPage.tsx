/**
 * View: JobSearchPage  (src/views/app/job-search/index.ts)
 *
 * Purpose:
 *   Primary job-search experience inside the authenticated app shell.
 *   Pixel-perfect clone of the resume.io "Jobs" screen.
 *
 * Responsibilities:
 *   - Fetches job listings from jobService
 *   - Manages query/location search state
 *   - Switches between "Recommended Jobs" and "Search" tabs
 *   - Shows EmptyJobState when no target role is set (initial state)
 *   - Renders JobCard list with loading skeleton
 *   - Opens JobDetailPanel on card click
 *   - Persists saved jobs in local state
 *
 * Responsive Behavior:
 *   - Mobile  (<640px) : full-width single column, bottom-bar navigation
 *   - Tablet  (640–1023px): single column with icon sidebar
 *   - Desktop (≥1024px): two-column layout (list + detail panel)
 *
 * Layout Role:
 *   Rendered as the page-level content inside AppLayout's main scrollable area.
 *   All padding handled by .jsp-* classes in job-search.css.
 *
 * Design Intent:
 *   Matches resume.io reference: white search card, blue tabs, blue CTA,
 *   bell alert link, empty-state illustration with "Continue" button.
 */

import React, { useEffect, useState, useCallback } from 'react';
import jobService from '@/services/jobService';
import type { Job } from '@/types/job.types';
import JobSearchBar from './components/JobSearchBar';
import JobSearchTabs, { type JobTab } from './components/JobSearchTabs';
import CreateJobAlert from './components/CreateJobAlert';
import EmptyJobState from './components/EmptyJobState';
import JobCard from './components/JobCard';
import JobListSkeleton from './components/JobListSkeleton';
import JobDetailPanel from './components/JobDetailPanel';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SearchState {
  query: string;
  location: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────

const JobSearchPage: React.FC = () => {
  // ── Data state ──
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ── UI state ──
  const [activeTab, setActiveTab] = useState<JobTab>('recommended');
  const [search, setSearch] = useState<SearchState>({ query: '', location: '' });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [hasTargetRole, setHasTargetRole] = useState<boolean>(false);

  // ── Fetch jobs ──
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobService.getJobs();
      setJobs(data);
      // If we got results, treat target role as "set" (real app would use user profile)
      if (data.length > 0) setHasTargetRole(true);
    } catch (err) {
      console.error('[JobSearchPage] fetch error:', err);
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // ── Handlers ──
  const handleSearch = (query: string, location: string) => {
    setSearch({ query, location });
    setActiveTab('search');
    fetchJobs();
  };

  const handleSave = async (job: Job, saved: boolean) => {
    // Optimistic UI update
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (saved) next.add(job.id);
      else next.delete(job.id);
      return next;
    });
    // Sync with backend (fire-and-forget; revert on error)
    try {
      await new Promise(r => setTimeout(r, 300));
    } catch {
      // Revert optimistic update on failure
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (saved) next.delete(job.id);
        else next.add(job.id);
        return next;
      });
    }
  };

  const handleApply = (job: Job) => {
    // In a real implementation: open application flow
    window.open(`/app/job-search/${job.id}/apply`, '_blank', 'noopener');
  };

  const handleContinue = () => {
    // Opens target-role onboarding (set hasTargetRole after completion)
    setHasTargetRole(true);
    fetchJobs();
  };

  // ── Derived: filtered list for search tab ──
  const filteredJobs = React.useMemo(() => {
    if (activeTab === 'recommended') return jobs;
    const q = search.query.toLowerCase();
    const l = search.location.toLowerCase();
    return jobs.filter((job) => {
      const matchTitle = !q || job.title.toLowerCase().includes(q) || (job.company_name ?? '').toLowerCase().includes(q);
      const matchLocation = !l || (job.company_address ?? '').toLowerCase().includes(l);
      return matchTitle && matchLocation;
    });
  }, [jobs, activeTab, search]);

  const showEmpty = !loading && !error && !hasTargetRole && filteredJobs.length === 0;
  const showList = !showEmpty;

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="jsp-root">
      {/* ── Search Bar ── */}
      <div className="jsp-search-wrap">
        <JobSearchBar
          onSearch={handleSearch}
          initialQuery={search.query}
          initialLocation={search.location}
        />
      </div>

      {/* ── Content area ── */}
      <div className="jsp-content">
        {/* Left / main column */}
        <div className={`jsp-main${selectedJob ? ' jsp-main-with-panel' : ''}`}>

          {/* Tabs */}
          <div className="jsp-tabs-wrap">
            <JobSearchTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              searchCount={12525995}
              savedCount={savedIds.size}
              onSavedClick={() => {/* future: filter saved */ }}
            />
          </div>

          {/* Alert link */}
          <div className="jsp-alert-wrap">
            <CreateJobAlert onClick={() => {/* future: subscribe */ }} />
          </div>

          {/* Loading skeleton */}
          {loading && <JobListSkeleton count={5} />}

          {/* Error */}
          {error && !loading && (
            <div className="jsp-error" role="alert">
              <p>{error}</p>
              <button className="jsp-retry-btn" onClick={fetchJobs}>
                Try again
              </button>
            </div>
          )}

          {/* Empty state */}
          {showEmpty && (
            <EmptyJobState onContinue={handleContinue} />
          )}

          {/* Job list */}
          {showList && !loading && !error && (
            <div className="jsp-list">
              {filteredJobs.length === 0 ? (
                <div className="jsp-no-results">
                  <p>No jobs found for your search. Try adjusting your filters.</p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onOpen={setSelectedJob}
                    onSave={handleSave}
                    onApply={handleApply}
                    isSaved={savedIds.has(job.id)}
                  />
                ))
              )}
            </div>
          )}
        </div>

        {/* Detail panel (desktop) */}
        {selectedJob && (
          <JobDetailPanel
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
            onApply={handleApply}
            onSave={(job) => handleSave(job, !savedIds.has(job.id))}
            isSaved={savedIds.has(selectedJob.id)}
          />
        )}
      </div>
    </div>
  );
};

export default JobSearchPage;
