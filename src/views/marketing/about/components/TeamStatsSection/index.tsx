/**
 * Component : TeamStatsSection
 * Purpose   : "A Small Team, Big Impact" — prose + 3-col impact stats.
 * Layout    : Centered, max-width 640px, white bg.
 * Responsive: Stats grid collapses to 1-col on mobile.
 * Animation : Stats pop in with scale fade, staggered.
 */
import React from "react";
import { useInView } from "../../hooks/useInView";
import { IMPACT_STATS } from "../../data/about.data";

const TeamStatsSection: React.FC = () => {
  const [ref, visible] = useInView(0.15);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        background: "#fff",
        padding: "88px 24px",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.65s ease, transform 0.65s ease",
      }}
      aria-label="Team stats"
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {/* Eyebrow */}
        <p style={{
          fontSize: 12, fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase" as const, color: "#2563EB", margin: "0 0 12px",
        }}>
          The team
        </p>

        {/* H2 */}
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800,
          color: "#111827", letterSpacing: "-0.8px", margin: "0 0 20px",
        }}>
          A Small Team, Big Impact
        </h2>

        {/* Prose */}
        <p style={{
          fontSize: 17, color: "#6B7280", lineHeight: 1.75, margin: "0 0 52px",
        }}>
          We're a lean team of engineers, designers, and career experts who care deeply about helping
          people land their dream jobs. Every feature we ship is tested by real job seekers.
        </p>

        {/* Stats 3-col */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}>
          {IMPACT_STATS.map(({ stat, label }, i) => (
            <div key={label} style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.9)",
              transition: `opacity 0.5s ease ${0.15 + i * 0.1}s,
                           transform 0.5s ease ${0.15 + i * 0.1}s`,
            }}>
              <p style={{
                fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 800,
                color: "#2563EB", margin: "0 0 6px", letterSpacing: "-1px",
              }}>
                {stat}
              </p>
              <p style={{ fontSize: 14, color: "#6B7280", fontWeight: 500, margin: 0 }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .team-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default TeamStatsSection;
