import React from "react";
import { useInView } from "../../hooks/useInView";

const AboutHero: React.FC = () => {
  const [ref, visible] = useInView(0.15);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        background: "#fff",
        padding: "50px 24px",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
      aria-label="Mission statement"
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <p style={{
          fontSize: "clamp(26px, 4vw, 42px)",
          fontWeight: 800,
          color: "#1B2332",
          lineHeight: 1.3,
          letterSpacing: "-0.8px",
          margin: 0,
        }}>
          We aspire to be the advisor,<br />
          advocate and keeper of peoples<br />
          personal career journey
        </p>
      </div>
    </section>
  );
};

export default AboutHero;