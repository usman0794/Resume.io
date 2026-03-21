/**
 * View: AutoApplyPage  (src/views/app/auto-apply/index.ts)
 *
 * Purpose:
 *   Welcome / landing page for the Auto Apply feature inside the
 *   authenticated app shell. Pixel-perfect clone of the resume.io
 *   "/app/auto-apply" screen.
 *
 * Responsibilities:
 *   - Page heading "Welcome to Auto Apply"
 *   - AutoApplyHero card (sparkle illustration + headline + CTA)
 *   - FeaturesGrid (4 benefit tiles)
 *   - Handles "Configure" CTA (placeholder — future modal/wizard)
 *
 * Responsive Behavior:
 *   - Mobile (<640px): single column, full-width hero card, 2×2 features
 *   - Tablet (640–1023px): slightly wider, same single-column layout
 *   - Desktop (≥1024px): max-width content area, 4-column feature grid
 *
 * Layout Role:
 *   Rendered as page-level content inside AppLayout's main scrollable
 *   area. All padding/margin via .aap-* CSS classes in auto-apply.css.
 *
 * Design Intent:
 *   White page background. Heading 28px 700 on desktop, 26px mobile.
 *   Hero card fills ~860px max on desktop (3 columns of sidebar+content).
 *   Features grid sits directly below with a 32px gap.
 */

import React from 'react';
import '../../../styles/client/auto-apply.css';
import AutoApplyHero from './components/AutoApplyHero';
import FeaturesGrid from './components/FeaturesGrid';

const AutoApplyPage: React.FC = () => {
  const handleConfigure = () => {
    // Future: open configuration wizard / modal
    console.log('[AutoApply] Configure clicked');
  };

  return (
    <div className="aap-root">
      {/* ── Page heading ── */}
      <h1 className="aap-heading">Welcome to Auto Apply</h1>

      {/* ── Hero card ── */}
      <div className="aap-hero-wrap">
        <AutoApplyHero onConfigure={handleConfigure} />
      </div>

      {/* ── Features grid ── */}
      <div className="aap-features-wrap">
        <FeaturesGrid />
      </div>
    </div>
  );
};

export default AutoApplyPage;
