import React from "react";
import { useInView } from "../../hooks/useInView";
import { PLATFORM_STATS } from "../../data/about.data";

/* SVG icons matching the reference — outline style */
const ICONS: React.ReactNode[] = [
  /* Resume / scroll icon */
  <svg key="resume" width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#1B2332" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>,

  /* Star / badge icon */
  <svg key="star" width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#1B2332" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>,

  /* Smile / sign-up icon */
  <svg key="smile" width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#1B2332" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>,

  /* Globe / languages icon */
  <svg key="globe" width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#1B2332" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>,
];

const StatsBar: React.FC = () => {
  const [ref, visible] = useInView(0.1);

  return (
    <>
      <style>{`
        .stats-bar-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .stats-bar-cell {
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          border-right: 1px solid #F3F4F6;
        }
        .stats-bar-cell:last-child { border-right: none; }

        @media (max-width: 900px) {
          .stats-bar-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-bar-cell:nth-child(2) { border-right: none; }
          .stats-bar-cell:nth-child(3) {
            border-top: 1px solid #F3F4F6;
            border-right: 1px solid #F3F4F6;
          }
          .stats-bar-cell:nth-child(4) {
            border-top: 1px solid #F3F4F6;
            border-right: none;
          }
        }
        @media (max-width: 560px) {
          .stats-bar-grid { grid-template-columns: 1fr; }
          .stats-bar-cell { border-right: none !important; border-top: 1px solid #F3F4F6; }
          .stats-bar-cell:first-child { border-top: none; }
        }
      `}</style>

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{
          borderTop: "1px solid #F3F4F6",
          borderBottom: "1px solid #F3F4F6",
          background: "#fff",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
        }}
      >
        <div className="stats-bar-grid">
          {PLATFORM_STATS.map((item, i) => (
            <div key={item.label} className="stats-bar-cell">
              {ICONS[i]}
              <p style={{
                fontSize: "clamp(15px, 1.8vw, 20px)",
                fontWeight: 700, color: "#111827",
                margin: 0, letterSpacing: "-0.3px", lineHeight: 1,
              }}>
                {item.stat}
              </p>
              <p style={{ fontSize: 14, color: "#6B7280", margin: 0, lineHeight: 1.4 }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StatsBar;
